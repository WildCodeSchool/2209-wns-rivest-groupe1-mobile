import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import {
  Arg,
  Field,
  Mutation,
  InputType,
  Query,
  Resolver,
  Authorized,
} from "type-graphql";
import dataSource from "../utils";
import { shield, rule } from "graphql-shield";
import Joi from "joi";

import { Category } from "../entity/category";
import { Blog } from "../entity/blog";
import { User } from "../entity/user";

@InputType({ description: "create new user" })
class CreateUserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  pseudo: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  avatar?: string;
}
@InputType({ description: "update user data" })
class UpdateUserInput implements Partial<User> {
  @Field({ nullable: true })
  pseudo?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  avatar?: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  async getToken(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    try {
      const userFromDB = await dataSource.manager.findOneByOrFail(User, {
        email,
      });
      if (process.env.JWT_SECRET_KEY === undefined) {
        throw new Error();
      }

      if (await argon2.verify(userFromDB.hashedPassword, password)) {
        const token = jwt.sign(
          { email: userFromDB.email, role: userFromDB.role },
          process.env.JWT_SECRET_KEY
        );
        return JSON.stringify({
          token,
          user: {
            id: userFromDB.id,
            pseudo: userFromDB.pseudo,
            email: userFromDB.email,
            avatar: userFromDB.avatar,
            description: userFromDB.description,
          },
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
      throw new Error("Invalid Auth");
    }
  }

  @Authorized()
  @Query(() => User)
  async getOneUser(@Arg("email") email: string): Promise<User> {
    try {
      const userFromDB = await dataSource.manager.findOneOrFail(User, {
        where: { email },
        relations: {
          images: true,
          blog: {
            articles: true,
            category: true,
          },
        },
      });
      return userFromDB;
    } catch (err) {
      console.log(err);
      throw new Error("Invalid query");
    }
  }

  @Authorized()
  @Mutation(() => User)
  async createUser(
    @Arg("data") createUserParams: CreateUserInput
  ): Promise<User> {
    // console.log("inside mutation");
    const { email, pseudo, avatar, password, description } = createUserParams;
    let defaultCategory = await dataSource.manager.findOne(Category, {
      where: {
        label: "diverse",
      },
    });

    if (!defaultCategory) {
      const newCategory = new Category();
      newCategory.label = "diverse";

      defaultCategory = await dataSource.manager.save(newCategory);
    }

    const newBlog = new Blog();
    newBlog.category = defaultCategory;
    newBlog.label = "";
    newBlog.content = "";

    const saveBlog = await dataSource.manager.save(Blog, newBlog);

    const newUser = new User();
    newUser.email = email;
    newUser.description = description;
    newUser.pseudo = pseudo;
    newUser.avatar = avatar;
    newUser.hashedPassword = await argon2.hash(password);
    newUser.role = "USER";
    newUser.blog = newBlog;

    //make sure relations (blog, images) are sent as well?
    const userFromDB = await dataSource.manager.save(User, newUser);

    return userFromDB;
  }

  @Authorized()
  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: number,
    @Arg("data") updateUserParams: UpdateUserInput
  ): Promise<User> {
    try {
      const updatedUser: User = await dataSource
        .createQueryBuilder()
        .update(User)
        .set(updateUserParams)
        .where("id = :id", { id })
        .returning("*")
        .execute()
        .then((response) => {
          return response.raw[0];
        });

      return updatedUser;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to update user");
    }
  }

  @Authorized()
  @Mutation(() => User)
  async createAdmin(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("pseudo") pseudo: string
  ): Promise<User> {
    let defaultCategory = await dataSource.manager.findOne(Category, {
      where: {
        label: "diverse",
      },
    });

    if (!defaultCategory) {
      const newCategory = new Category();
      newCategory.label = "diverse";

      defaultCategory = await dataSource.manager.save(newCategory);
    }

    const newAdmin = new User();
    newAdmin.email = email;
    newAdmin.pseudo = pseudo;
    newAdmin.hashedPassword = await argon2.hash(password);
    newAdmin.role = "ADMIN";

    const adminFromDB = await dataSource.manager.save(User, newAdmin);
    console.log("ADMIN SAVED:", adminFromDB);

    return adminFromDB;
  }

  // @Authorized()
  // @Mutation(() => String)
  // async deleteUser(@Arg("id") id: number): Promise<String> {
  //   try {
  //     await dataSource.manager.delete(User, id);
  //     return "Deleted user successfully";
  //   } catch (error: any) {
  //     throw new Error("Failed to delete user");
  //   }
  // }
}

const signUpInputSchema = Joi.object({
  pseudo: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  description: Joi.string(),
  avatar: Joi.string(),
});

const signUpRule = rule({ cache: "contextual" })(
  async (
    parent,
    { data }: { data: CreateUserInput },
    context
  ): Promise<boolean> => {
    const { error } = signUpInputSchema.validate(data, { abortEarly: false });

    if (error) {
      console.log("ERROR", error);
      const errors = error.details.map((detail) => detail.message);
      context.validationErrors = errors;
      return false;
    }

    return true;
  }
);

export const permissions = shield({
  Mutation: {
    createUser: signUpRule,
  },
});
