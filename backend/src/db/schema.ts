import {pgTable, uuid, text, timestamp} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
// left is for using in code and right is the column name in database
//this is the schema for the users table in our database
export const users = pgTable('users',{
    id:text('id').primaryKey(), //using text instead of uuid because clerk provides id as string
    email:text('email').notNull().unique(),
    name:text('name').notNull(),
    imageUrl:text('image_url'),
    createdAt:timestamp('created_at', {mode:'date'}).defaultNow().notNull(),
    updatedAt:timestamp('updated_at', {mode:'date'}).defaultNow().notNull(),
});

export const products = pgTable('products',{
    id:uuid('id').primaryKey().defaultRandom(),
    title:text("title").notNull(),
    description:text("description").notNull(),
    imageUrl:text("image_url").notNull(),
    //it means that if a user is deleted then all their products will also be deleted
    userId:text('user_id').notNull().references(() => users.id,{ onDelete:'cascade'}),
     //foreign key to users table
    createdAt:timestamp('created_at', {mode:'date'}).defaultNow().notNull(),
    updatedAt:timestamp('updated_at', {mode:'date'}).defaultNow().notNull(),
});

export const comments = pgTable("comments",{
    id:uuid("id").primaryKey().defaultRandom(),
    content:text("content").notNull(),
    userId:text("user_id").notNull().references(()=>users.id,{onDelete:'cascade'}),
    productId:uuid("product_id").notNull().references(()=>products.id,{onDelete:'cascade'}),
    createdAt:timestamp('created_at', {mode:'date'}).defaultNow().notNull(),
    updatedAt:timestamp('updated_at', {mode:'date'}).defaultNow().notNull(),
})

//users realtaions 
//now we are writing relations between our tables so that we can easily query related data using drizzle-orm
 export const usersRelations=relations(users,({many})=>({
     products:many(products),//one user many products
     comments:many(comments),  //one user many comments
 }))
 //products realtions

 export const productsRelations=relations(products,({one,many})=>({
    //ye wali samaj nhi a rhi 
    //'fields' is used to specify the foreign key field in the products table that references the users table
   
   // this make sure realtions work in one way 
    //'references' is used to specify the primary key field in the users table that is referenced by the foreign key in the products table
    user:one(users,{ fields:[products.userId],references:[users.id]}), //one product belongs to one user
    comments:many(comments), //one product many comments
 }))

 //comments relations
//comment belong ot one user and one producct
  export const commentsRelations=relations(comments,({one})=>({
    //
    user:one(users,{ fields:[comments.userId],references:[users.id]}),
    product:one(products,{ fields:[comments.productId],references:[products.id]}),
  }))

  //type inferance for our tables
  //for users
  export type User= typeof users.$inferSelect;
  export type NewUser= typeof users.$inferInsert;
//for products
export type Product= typeof products.$inferSelect;
export type NewProduct= typeof products.$inferInsert;
 //for comments
 export type Comments= typeof comments.$inferSelect;
 export type NewComment=typeof comments.$inferInsert;