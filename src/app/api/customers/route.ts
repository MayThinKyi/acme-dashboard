import { customerSchema } from "@/schemas/schemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET(request:NextRequest){
    try {
        const session=await getServerSession(authOptions);
        if(!session?.user) return NextResponse.json({message:'Unauthenticated!'},{status:401})
            else{
         const customers=await prisma.customer.findMany({include:{invoices:true}});
        return NextResponse.json(customers,{status:200});}
    } catch (error) {
        console.log('error',error);
        return NextResponse.json({error:error},{status:500});
    }
}

export async function POST(request:NextRequest){
    try {
        const session=await getServerSession(authOptions);
        if(!session?.user) return NextResponse.json({message:'Unauthenticated!'},{status:401})
            else{
        const data=await request.json();
        const validation=await customerSchema.safeParse(data);
        if(!validation.success) return NextResponse.json({error:validation.error.format()},{status:400});
        const isEmailExists=await prisma.customer.findUnique({
            where:{email:data.email}
        })
        if(isEmailExists)  return NextResponse.json({message:'Customer Email already exists! '},{status:400});
         const customer=await prisma.customer.create({
            data:{
                name:data.name,email:data.email,imageUrl:data.imageUrl
            }
         })
         return NextResponse.json(customer,{status:201})}
    } catch (error) {
            console.log('error',error);
            return NextResponse.json({error:error},{status:500})
    }
}