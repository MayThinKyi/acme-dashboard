import { customerSchema } from "@/schemas/schemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

interface RouteProps{
    params:{
        customerId:string;
    }
}
export async function PUT(request:NextRequest,{params:{customerId}}:RouteProps){
    try {
        const session=await getServerSession(authOptions);
        if(!session?.user) return NextResponse.json({message:'Unauthenticated!'},{status:401})
            else{
        const data=await request.json();
        const validation=customerSchema.safeParse(data);
        if(!validation.success) return NextResponse.json({error:validation.error.format()},{status:400});
        const customer=await prisma.customer.findUnique({where:{id:Number(customerId)}});
        if(!customer) return NextResponse.json({message:'Customer not found!'},{status:404});
        const updatedCustomer=await prisma.customer.update({where:{id:Number(customerId)},data:{
            name:data.name,email:data.email,imageUrl:data.imageUrl
        }})
        return NextResponse.json(updatedCustomer,{status:200});
    }
    } catch (error) {
        console.log('error',error)
        return NextResponse.json(error,{status:500});
    }
}

export async function DELETE(request:NextRequest,{params:{customerId}}:RouteProps){
    try {
        const session=await getServerSession(authOptions);
        if(!session?.user) return NextResponse.json({message:'Unauthenticated!'},{status:401})
            else{
        const customer=await prisma.customer.findUnique({where:{id:Number(customerId)}});
        if(!customer) return NextResponse.json({message:'Customer not found!'},{status:404});
        await prisma.customer.delete({where:{id:Number(customerId)}});
        return NextResponse.json({message:'Customer deleted!'},{status:200});
            }
    } catch (error) {
        console.log('error',error);
        return NextResponse.json({error:error},{status:500});
    }
}