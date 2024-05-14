 import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/db';
import { invoiceSchema } from '@/schemas/schemas';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function GET(request:NextRequest){
    try {
        const session=await getServerSession(authOptions);
        if(!session?.user) return NextResponse.json({message:'Unauthenticated!'},{status:401})
            else{
        const invoices=await prisma.invoice.findMany({include:{customer:true}});
        return NextResponse.json(invoices,{status:200});
            }
    } catch (error) {
            console.log(error);
            return NextResponse.json({error:error},{status:500});
    }
}

export async function POST(request:NextRequest){
    try {
        const session=await getServerSession(authOptions);
        if(!session?.user) return NextResponse.json({message:'Unauthenticated!'},{status:401})
            else{
        const data=await request.json();
        const validation=invoiceSchema.safeParse(data);
        if(!validation.success)  return NextResponse.json({error:validation.error.format()},{status:400});
        const invoice=await prisma.invoice.create({
            data:{
                amount:data.amount,status:data.status,customerId:data.customerId
            }
        })
        return NextResponse.json(invoice,{status:201});
    }
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:error},{status:500});
    }
}