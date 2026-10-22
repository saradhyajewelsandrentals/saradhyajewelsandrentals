const initialData = {
  storeInfo: {
    name: "Saradhya Jewels & Rentals",
    tagline: "Big occasions. Beautiful jewellery.",
    subtagline: "Discover bridal sets, temple jewellery, and diamond-look polki to rent for your special moments or purchase for a lifetime.",
    announcement: "Free Pan-India Delivery on orders above ₹1,999 | 100% Sanitized & Insured Rentals",
    phone: "+91 98765 43210",
    email: "concierge@saradhyajewels.com",
    address: "Bespoke Lounge, Jubilee Hills, Hyderabad & Indiranagar, Bengaluru"
  },
  categories: [
    {
      id: "bridal-sets",
      name: "Bridal Sets",
      tagline: "Complete Opulence",
      image: "/images/royal-bridal-set.jpg",
      itemCount: 42
    },
    {
      id: "chokers",
      name: "Chokers",
      tagline: "Heritage Grace",
      image: "/images/choker-set.jpg",
      itemCount: 38
    },
    {
      id: "haaram",
      name: "Haaram / Long Necklaces",
      tagline: "Royal Layers",
      image: "/images/temple-haaram.jpg",
      itemCount: 29
    },
    {
      id: "earrings",
      name: "Earrings & Jhumkas",
      tagline: "Timeless Drop",
      image: "/images/peacock-jhumkas.jpg",
      itemCount: 64
    },
    {
      id: "bangles",
      name: "Bangles",
      tagline: "Crafted Elegance",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
      itemCount: 45
    },
    {
      id: "kundan-sets",
      name: "Bridal Sets / Kundan",
      tagline: "Rajputana Radiance",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
      itemCount: 31
    },
    {
      id: "hair-accessories",
      name: "Hair Accessories",
      tagline: "Maang Tikka & Matha Patti",
      image: "/images/velvet-cushion.jpg",
      itemCount: 24
    },
    {
      id: "waist-belts",
      name: "Waist Belts",
      tagline: "Sculpted Royalty",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
      itemCount: 18
    }
  ],
  occasions: [
    {
      id: "bridal",
      title: "Bridal",
      subtitle: "For the Bride",
      description: "Opulent polki & temple jewellery tailored for the bride on her special day.",
      image: "/images/banner-bride.jpg",
      buttonText: "Shop Bridal"
    },
    {
      id: "wedding-guest",
      title: "Wedding Guest",
      subtitle: "For the Attendee",
      description: "Understated elegance and classic sparkle for unforgettable celebrations.",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
      buttonText: "Shop Guest"
    },
    {
      id: "festival",
      title: "Festival",
      subtitle: "For Festive Days",
      description: "Traditional gold temple finish designed for poojas and festive gatherings.",
      image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop",
      buttonText: "Shop Festive"
    },
    {
      id: "party",
      title: "Party",
      subtitle: "For Evening Cocktails",
      description: "Contemporary American Diamond and modern stones for cocktail nights.",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop",
      buttonText: "Shop Party"
    }
  ],
  products: [
    {
      id: "prod-1",
      name: "Aura Kundan Necklace Set",
      category: "Chokers",
      categoryId: "chokers",
      tag: "Rentable",
      badgeColor: "#58111a",
      rating: 4.9,
      reviewsCount: 38,
      buyPrice: 7499,
      rentPrice: 999,
      rentDuration: "4 days",
      securityDeposit: 2500,
      image: "/images/choker-set.jpg",
      description: "Handcrafted choker set encrusted with high-grade semi-precious kundan, ruby gemstones, emerald drops and delicate pearl cluster drops.",
      metalType: "Brass with 22K Micro Gold Plating",
      includes: "1 Choker Necklace, 1 Pair Matching Earrings, 1 Maang Tikka",
      inStockBuy: true,
      inStockRent: true
    },
    {
      id: "prod-2",
      name: "Padmavati Temple Long Haaram",
      category: "Haaram / Long Necklaces",
      categoryId: "haaram",
      tag: "Bestseller",
      badgeColor: "#c59b27",
      rating: 5.0,
      reviewsCount: 64,
      buyPrice: 14500,
      rentPrice: 1899,
      rentDuration: "4 days",
      securityDeposit: 4000,
      image: "/images/temple-haaram.jpg",
      description: "Intricately carved temple haaram featuring auspicious Goddess Lakshmi central motif framed by handcrafted floral filigree and kemp stones.",
      metalType: "Antique Matte Gold Finish with Kemp Stones",
      includes: "1 Long Haaram Necklace, Matching Jhumkas",
      inStockBuy: true,
      inStockRent: true
    },
    {
      id: "prod-3",
      name: "Mayuri Peacock Jhumkas",
      category: "Earrings & Jhumkas",
      categoryId: "earrings",
      tag: "New Arrival",
      badgeColor: "#1b4d3e",
      rating: 4.8,
      reviewsCount: 29,
      buyPrice: 3200,
      rentPrice: 499,
      rentDuration: "4 days",
      securityDeposit: 1000,
      image: "/images/peacock-jhumkas.jpg",
      description: "Dancing peacock motif jhumkas adorned with natural green emerald enamel, polki accents and resonant pearl seed fringe.",
      metalType: "Gold Plated Brass with Meenakari work",
      includes: "1 Pair of Statement Jhumkas with Support Chains",
      inStockBuy: true,
      inStockRent: true
    },
    {
      id: "prod-4",
      name: "Vardhaan Royal Bridal Set",
      category: "Bridal Sets",
      categoryId: "bridal-sets",
      tag: "Most Wanted",
      badgeColor: "#460c14",
      rating: 5.0,
      reviewsCount: 92,
      buyPrice: 21999,
      rentPrice: 2999,
      rentDuration: "4 days",
      securityDeposit: 6000,
      image: "/images/royal-bridal-set.jpg",
      description: "Regal bridal combination of choker, long layered necklace, heavy designer earrings, matha patti, and royal nath.",
      metalType: "24K Gold Polish with Uncut Polki & AAA CZ",
      includes: "Choker, Long Necklace, Earrings, Matha Patti, Nath, Haathphool pair",
      inStockBuy: true,
      inStockRent: true
    }
  ],
  rentingSteps: [
    {
      step: 1,
      icon: "Gem",
      title: "Choose Jewellery",
      description: "Browse our vast collection of statement necklaces, chokers and complete bridal sets."
    },
    {
      step: 2,
      icon: "CalendarCheck",
      title: "Select Rental Dates",
      description: "Pick your 3, 5, or 7-day rental period starting 1 day before your event date to ensure everything fits comfortably."
    },
    {
      step: 3,
      icon: "PackageCheck",
      title: "Receive & Wear",
      description: "Receive sanitized, pristine jewellery in protective casing, ready to stun."
    },
    {
      step: 4,
      icon: "RotateCcw",
      title: "Easy Return",
      description: "Place it back in the prepaid return packaging and our courier will pick it up the next day. No cleaning required!"
    }
  ],
  styleInspirations: [
    {
      id: "insp-1",
      title: "Temple Gold Elegance",
      subtitle: "REAL BRIDE LOOK",
      description: "Handcrafted pure gold finish antique temple motifs styled with a lush emerald green Kanjeevaram silk saree.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
      tag: "Real Bride: Ananya"
    },
    {
      id: "insp-2",
      title: "Polki Royal Charm",
      subtitle: "SANGEET & RECEPTION",
      description: "Uncut polki crystals with pale rose tourmaline drops styled over a bespoke pastel bridal lehenga.",
      image: "/images/banner-bride.jpg",
      tag: "Real Bride: Meera"
    },
    {
      id: "insp-3",
      title: "Contemporary Sparkle",
      subtitle: "COCKTAIL & GALA NIGHT",
      description: "Dazzling American Diamond collar paired with an emerald velvet evening silhouette for effortless red-carpet glamour.",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop",
      tag: "Fashion Muse: Rhea"
    }
  ],
  trustBadges: [
    {
      id: "tb-1",
      icon: "ShieldCheck",
      title: "Material Details",
      description: "High-grade brass base with micro-gold plating, kundan & AAA grade CZ stones."
    },
    {
      id: "tb-2",
      icon: "Sparkles",
      title: "Jewellery Care",
      description: "Sanitized between wears, guaranteed hygiene and skin-friendly metals."
    },
    {
      id: "tb-3",
      icon: "Calendar",
      title: "Rental Terms",
      description: "Extend 4–8 day options with flexible extensions and 100% damage protection."
    },
    {
      id: "tb-4",
      icon: "Truck",
      title: "Express Delivery",
      description: "Pan-India express shipping arriving safely 2 days prior to your event."
    },
    {
      id: "tb-5",
      icon: "Gift",
      title: "Easy Returns",
      description: "Hassle-free doorstep return pickup scheduled at your convenience."
    }
  ]
};

module.exports = initialData;
