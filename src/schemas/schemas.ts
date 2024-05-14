import { z } from "zod";

export const registerSchema=z.object({
    name:z.string().min(1,{message:"Name is required!"}),
    email:z.string().email().min(1,{message:'Email is required!'}),
    password:z.string().min(6,{message:'Password must be at least 6 characters!'})
})
export const loginSchema=z.object({
     email:z.string().email().min(1,{message:'Email is required!'}),
    password:z.string().min(6,{message:'Password must be at least 6 characters!'})
})
export const customerSchema=z.object({
    name:z.string().min(1,{message:"Name is required!"}),
    email:z.string().email().min(1,{message:'Email is required!'}),
    imageUrl:z.string().min(6,{message:'Image is required!'})
})

export const invoiceSchema=z.object({
    amount:z.number().min(1,{message:'Amount is required!'}),
    status:z.string().min(1,{message:"Invoice status is required!"}),
    customerId:z.number().min(1,{message:'Customer is required!'})
})