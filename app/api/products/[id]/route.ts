import { NextResponse } from "next/server";
import { products } from "@/data/products";

// 1. PUT Request (Admin edits a product details)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.includes("admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const productId = Number(params.id);
  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  try {
    const body = await request.json();

    products[index] = {
      ...products[index],
      ...body,
      // Recalculate discount percentage if prices were changed
      discountPercent: body.price
        ? Math.round(
            ((body.price - (body.discountPrice ?? body.price)) / body.price) *
              100,
          )
        : products[index].discountPercent,
    };

    return NextResponse.json({ success: true, product: products[index] });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 400 },
    );
  }
}

// 2. DELETE Request (Admin deletes a product)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.includes("admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const productId = Number(params.id);
  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // Remove the product from our array
  products.splice(index, 1);

  return NextResponse.json({
    success: true,
    message: "Product deleted successfully",
  });
}
