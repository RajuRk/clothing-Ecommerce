import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  let filtered = [...products];

  if (category) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    );
  }

  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.subcategory.toLowerCase().includes(query),
    );
  }
  return NextResponse.json(filtered);
}

// 2. POST Request (Admin adds a product)
export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");

  // Check if role is admin
  if (!authHeader || !authHeader.includes("admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      name,
      brand,
      description,
      price,
      discountPrice,
      category,
      subcategory,
      sizes,
      images,
    } = body;

    if (!name || !brand || !price || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const calculatedDiscount = Math.round(
      ((price - (discountPrice ?? price)) / price) * 100,
    );

    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      name,
      brand,
      description: description || "Product description pending.",
      price: Number(price),
      discountPrice: Number(discountPrice ?? price),
      discountPercent: calculatedDiscount,
      category,
      subcategory: subcategory || "General",
      images:
        images && images.length > 0
          ? images
          : [
              "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600",
            ],
      sizes: sizes && sizes.length > 0 ? sizes : ["M", "L", "XL"],
      ratings: 5.0,
      reviewsCount: 0,
      inStock: true,
    };

    products.push(newProduct);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 },
    );
  }
}
