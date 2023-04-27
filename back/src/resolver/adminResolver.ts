import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Arg, Mutation, Query, Resolver, Authorized } from "type-graphql";
import { Category } from "../entity/category";

import { Admin } from "../entity/admin";
import { User } from "../entity/user";
import dataSource from "../utils";

@Resolver(Admin)
export class AdminResolver {
  @Query(() => String)
  async getToken(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    try {
      const adminFromDB = await dataSource.manager.findOneByOrFail(Admin, {
        email,
      });
      if (process.env.JWT_SECRET_KEY === undefined) {
        throw new Error();
      }

      if (await argon2.verify(adminFromDB.hashedPassword, password)) {
        const token = jwt.sign(
          { email: adminFromDB.email, role: adminFromDB.role },
          process.env.JWT_SECRET_KEY
        );
        return JSON.stringify({
          token,
          user: {
            id: adminFromDB.id,
            pseudo: adminFromDB.pseudo,
            email: adminFromDB.email,
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
  @Mutation(() => Admin)
  async createAdmin(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("pseudo") pseudo: string
  ): Promise<Admin> {
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

    const newAdmin = new Admin();
    newAdmin.email = email;
    newAdmin.pseudo = pseudo;
    newAdmin.hashedPassword = await argon2.hash(password);
    newAdmin.role = "ADMIN";

    const adminFromDB = await dataSource.manager.save(User, newAdmin);
    console.log("ADMIN SAVED:", adminFromDB);

    return adminFromDB;
  }

  @Authorized()
  @Query(() => User)
  async adminGetOneUser(@Arg("email") email: string): Promise<User> {
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
      const userDetail = {
        id: userFromDB.id,
        pseudo: userFromDB.pseudo,
        email: userFromDB.email,
      };

      return userFromDB;
    } catch (err) {
      console.log(err);
      throw new Error("Invalid query");
    }
  }

  @Authorized()
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await dataSource.manager.find(User, {
      relations: {
        blog: {
          articles: true,
          category: true,
        },
      },
    });
  }

  @Authorized()
  @Mutation(() => String)
  async deleteUser(@Arg("id") id: number): Promise<String> {
    try {
      await dataSource.manager.delete(User, id);
      return "Deleted user successfully";
    } catch (error: any) {
      throw new Error("Failed to delete user");
    }
  }
}
