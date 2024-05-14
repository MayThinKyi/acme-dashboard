import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";
import { invoiceSchema } from "@/schemas/schemas";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

interface RouteProps{
   params:{
    invoiceId:string;
   }
}

export async function PUT(request:NextRequest,{params:{invoiceId}}:RouteProps){
    try {
        const session=await getServerSession(authOptions);
        if(!session?.user) return NextResponse.json({message:'Unauthenticated!'},{status:401})
            else{
        const data=await request.json();
        const validation=invoiceSchema.safeParse(data);
        if(!validation.success) return NextResponse.json({error:validation.error.format()},{status:400});
        const invoice=await prisma.invoice.findUnique({where:{id:Number(invoiceId)}});
        if(!invoice)  return NextResponse.json({message:"Invoice not found!"},{status:404});
        const updatedInvoice=await prisma.invoice.update({
            where:{id:Number(invoiceId)},
            data:{amount:data.amount,status:data.status,customerId:data.customerId}
        });
        return NextResponse.json(updatedInvoice,{status:200});
    }
    } catch (error) {
        console.log('error',error);
        return NextResponse.json({error:error},{status:500});
    }
}

export async function DELETE(request:NextRequest,{params:{invoiceId}}:RouteProps){
    try {
        const session=await getServerSession(authOptions);
        if(!session?.user) return NextResponse.json({message:'Unauthenticated!'},{status:401})
            else{
        const invoice=await prisma.invoice.findUnique({where:{id:Number(invoiceId)}});
        if(!invoice) return NextResponse.json({message:'Invoice not found!'},{status:404});
        await prisma.invoice.delete({where:{id:Number(invoiceId)}});
        return NextResponse.json({message:'Invoice deleted successfully!'},{status:200});
            }
    } catch (error) {
            console.log(error);
            return NextResponse.json({error:error},{status:500});
    }
}