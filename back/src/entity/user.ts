import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Blog } from "./blog";
import { Image } from "./image";
import { IsEmail, Matches, MinLength } from "class-validator";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @Field()
  @Column()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: "Pseudo must contain only letters and numbers",
  })
  pseudo: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @Matches(/^[a-zA-Z0-9\s]*$/, {
    message: "Description must contain only letters, numbers, and spaces",
  })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: "Avatar must contain only letters and numbers",
  })
  avatar?: string;

  @Column()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  hashedPassword: string;

  @Column()
  role: string;

  @Field(() => [Image])
  @OneToMany(() => Image, (image) => image.user)
  public images?: Image[];

  @Field(() => Blog)
  @OneToOne(() => Blog, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  blog: Blog;
}

// @ObjectType()
// @Entity()
// export class User {
//   @Field()
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Field()
//   @Column({ unique: true })
//   email: string;

//   @Field()
//   @Column()
//   pseudo: string;

//   @Field({ nullable: true })
//   @Column({ nullable: true })
//   description?: string;

//   @Field({ nullable: true })
//   @Column({ nullable: true })
//   avatar?: string;

//   @Column()
//   hashedPassword: string;

//   @Column()
//   role: string;

//   @Field(() => [Image])
//   @OneToMany(() => Image, (image) => image.user)
//   public images?: Image[];

//   @Field(() => Blog)
//   @OneToOne(() => Blog, {
//     cascade: true,
//     onDelete: "CASCADE",
//   })
//   @JoinColumn()
//   blog: Blog;
// }
