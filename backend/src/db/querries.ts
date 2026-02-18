import {db} from './index';
import {eq} from 'drizzle-orm';
import {
    users,
    comments,
    products, 
    type NewProduct, 
    type NewUser, 
    type NewComment} from './schema';

// user querries

//i am creating a user which is type of newuser 
export const createUser= async (data:NewUser)=>{
    const [user]= await db.insert(users).values(data).returning();
    return user;
};

export const getUserById= async(id:string)=>{
    return db.query.users.findFirst({where: eq(users.id,id)});
}
export const updateUser= async(id:string,data:Partial<NewUser>)=>{
    const [user]=await db.update(users).set(data).where(eq(users.id,id)).returning();
    return user;
}
//this is either create or update as we are calling both functions in this function
export const upsertUser= async(data:NewUser)=>{
    const existingUser = await getUserById(data.id);
    if(existingUser){
        return updateUser(data.id,data);
    }
    return createUser(data);

}
// product querries

//crete product 
export const createProduct= async (data:NewProduct)=>{
    const [product]= await db.insert(products).values(data).returning();
    return product;
};
//get all products
export const getAllProducts= async()=>{
    //this will fetch all the products 
    //we need to use the user relations to fetch the user data along with the product data
    //one simple statemnet get all info of user also 
    //its is happening because of the relations we have defined in our schema file
    return db.query.products.findMany({
        with:{user:true},
        //descending means you see latest product first 
        orderBy:(products,{desc})=>[desc(products.createdAt)]
        //squre are need as the drizzle orm orderby an array evn for the single columsn 
    });
}
 export const getProductById = async(id:string)=>{
    return db.query.products.findFirst({
        where: eq(products.id,id),
        with:{user:true,
            comments:{
                with:{user:true},
                //this will order the comments by createdAt in descending
                orderBy:(comments,{desc})=>[desc(comments.createdAt)],
            }
        }

    
    });

 }

 export const getProductsByUserId= async(userId:string)=>{
    return db.query.products.findMany({
        where:eq(products.userId,userId),
        with:{user:true},
        orderBy:(products,{desc})=>[desc(products.createdAt)] 
    })
 }
 //this is to update the product 
 //partial meaning the whole may not need to be updated 
 //set data is the new data we want to update 
 export const updateProduct= async(id:string,data:Partial<NewProduct>)=>{
    const [product]=await db.update(products).set(data).where(eq(products.id,id)).returning();
    return product;
}
export const deleteProduct= async(id:string)=>{
    const [product]=await db.delete(products).where(eq(products.id,id)).returning();
    return product;
};

//comment querries
// create comment 
export const createComment= async (data:NewComment)=>{
    const [comment]=await db.insert(comments).values(data).returning();
    return comment;
} 
// it is to delete the comment
export const deleteComment= async(id:string)=>{
    const [comment]=await db.delete(comments).where(eq(comments.id,id)).returning();
    return comment;
}
// get comments by user id
//WHERE WITH IS REALTIONS 
export const getCommentsById= async(id:string)=>{
    return db.query.comments.findFirst({
        where:eq(comments.userId,id),
        with:{user:true}
    })
 }