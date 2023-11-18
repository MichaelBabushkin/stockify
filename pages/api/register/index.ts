import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  user: any;
};

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {

    const { name, email, password } = (await req.body.data) as {
      name: string;
      email: string;
      password: string;
    };
    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      user: JSON.stringify({
        status: "error",
        message: error.message,
      }),
    });
  }
}
