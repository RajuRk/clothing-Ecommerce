import { NextResponse } from "next/server";
import { products } from "@/data/products";

// 1. PUT Request (Admin edits product details - awaits params)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.includes("admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Resolve the Promise for params
  const { id } = await params;
  const productId = Number(id);
  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  try {
    const body = await request.json();

    products[index] = {
      ...products[index],
      ...body,
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

// 2. DELETE Request (Admin deletes product - awaits params)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.includes("admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Resolve the Promise for params
  const { id } = await params;
  const productId = Number(id);
  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  products.splice(index, 1);

  return NextResponse.json({
    success: true,
    message: "Product deleted successfully",
  });
}
