import { Item } from "@/types/item";
import { Minus, Plus, X, ShoppingCart, Star } from "lucide-react";
import variables from "@/config/variables";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { CartContext } from "@/context/CartContext";
import { toast } from "../ui/use-toast";
import { useGetItemAddons } from "@/hooks/use-addon";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

interface ItemPageProps {
  item: Item;
  onClose: () => void;
}

const ItemPage: React.FC<ItemPageProps> = ({ item, onClose }) => {
  const { addItem } = useContext(CartContext);
  const { data: addons, isLoading: addonsLoading } = useGetItemAddons(
    item?._id
  );

  // State management
  const [note, setNote] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);
  const [itemNumber, setItemNumber] = useState(1);

  // Memoized initial variant
  const initialVariant = useMemo(() => {
    if (item?.variable && item?.variations?.options?.length > 0) {
      return item.variations.options[0];
    }
    return null;
  }, [item]);

  const [selectedVariant, setSelectedVariant] = useState(initialVariant);

  // Memoized pricing calculations
  const itemPricing = useMemo(() => {
    const basePrice =
      item?.variable && selectedVariant
        ? selectedVariant.price || 0
        : item?.price || 0;

    const baseSalePrice =
      item?.variable && selectedVariant
        ? selectedVariant.salePrice || 0
        : item?.salePrice || 0;

    const addonsPrice = selectedAddons.reduce(
      (total, addon) => total + (addon?.price || 0),
      0
    );
    const finalPrice = baseSalePrice > 0 ? baseSalePrice : basePrice;
    const totalPrice = finalPrice * itemNumber + addonsPrice;

    return {
      basePrice,
      baseSalePrice,
      addonsPrice,
      finalPrice,
      totalPrice,
      hasDiscount: baseSalePrice > 0 && baseSalePrice < basePrice,
    };
  }, [item, selectedVariant, selectedAddons, itemNumber]);

  // Handlers
  const handleVariant = useCallback(
    (index: number) => {
      if (!item?.variations?.options?.[index]) return;
      setSelectedVariant(item.variations.options[index]);
    },
    [item]
  );

  const handleQuantityChange = useCallback((increment: boolean) => {
    setItemNumber((prev) => {
      if (increment) return prev + 1;
      return prev > 1 ? prev - 1 : 1;
    });
  }, []);

  const handleAddonToggle = useCallback((addon: any) => {
    setSelectedAddons((prev) => {
      const isSelected = prev.some((selected) => selected._id === addon._id);
      return isSelected
        ? prev.filter((selected) => selected._id !== addon._id)
        : [...prev, addon];
    });
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!item) return;

    const cartItem = {
      item: {
        id: item._id,
        name: item.name,
        imgURL: item.imgURL,
        price: itemPricing.basePrice,
        salePrice: itemPricing.baseSalePrice,
        restaurantId: item.restaurantId || null,
      },
      quantity: itemNumber,
      addons: selectedAddons,
      variations: item.variable ? selectedVariant : [],
      total: itemPricing.totalPrice,
      note: note.trim(),
      priceAtTheTime: itemPricing.finalPrice,
    };

    addItem(cartItem);

    toast({
      description: `تم إضافة ${item.name} إلى السلة بنجاح`,
      duration: 3000,
      className: "bg-green-500 text-white border-green-600",
    });

    onClose();
  }, [
    item,
    itemNumber,
    selectedAddons,
    selectedVariant,
    itemPricing,
    note,
    addItem,
    onClose,
  ]);

  if (!item) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">المنتج غير متوفر</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b z-10">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold truncate mx-4 flex-1 text-center">
            {item.name}
          </h1>
          <div className="flex items-center gap-2">
            {itemPricing.hasDiscount && (
              <Badge variant="destructive" className="text-xs">
                خصم
              </Badge>
            )}
            <div className="text-right">
              {selectedVariant?.name && (
                <p className="text-sm text-muted-foreground">
                  {selectedVariant.name}
                </p>
              )}
              <p className="font-bold text-primary">
                {itemPricing.finalPrice} {variables.curancy.egp}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Product Image */}
        <div className="relative">
          <img
            src={item.imgURL || "/placeholder-food.jpg"}
            alt={item.name}
            className="w-full h-64 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-food.jpg";
            }}
          />
          {itemPricing.hasDiscount && (
            <div className="absolute top-4 right-4">
              <Badge variant="destructive" className="text-white">
                {Math.round(
                  ((itemPricing.basePrice - itemPricing.baseSalePrice) /
                    itemPricing.basePrice) *
                    100
                )}
                % خصم
              </Badge>
            </div>
          )}
        </div>

        <div className="p-4 space-y-6">
          {/* Product Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground">4.5</span>
              </div>
            </div>
            {item.description && (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          {/* Variants */}
          {item.variable && item.variations?.options?.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">اختر الحجم</h3>
                <div className="flex flex-wrap gap-2">
                  {item.variations.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedVariant === option ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handleVariant(index)}
                      className="min-w-[80px]"
                    >
                      <div className="text-center">
                        <div className="font-medium">{option.name}</div>
                        <div className="text-xs opacity-75">
                          {option.salePrice || option.price}{" "}
                          {variables.curancy.egp}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Addons */}
          {!addonsLoading && addons && addons.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">الإضافات المتاحة</h3>
                <div className="space-y-2">
                  {addons.map((addon) => {
                    const isSelected = selectedAddons.some(
                      (selected) => selected._id === addon._id
                    );
                    return (
                      <div
                        key={addon._id}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => handleAddonToggle(addon)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                              isSelected
                                ? "border-primary bg-primary"
                                : "border-muted-foreground"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-2 h-2 bg-white rounded-sm" />
                            )}
                          </div>
                          <span className="font-medium">{addon.name}</span>
                        </div>
                        <span className="text-primary font-semibold">
                          +{addon.price} {variables.curancy.egp}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quantity and Price */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-semibold">الكمية:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(false)}
                      disabled={itemNumber <= 1}
                      className="w-8 h-8"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-bold">
                      {itemNumber}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(true)}
                      className="w-8 h-8"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  {itemPricing.hasDiscount && (
                    <div className="text-sm text-muted-foreground line-through">
                      {itemPricing.basePrice * itemNumber}{" "}
                      {variables.curancy.egp}
                    </div>
                  )}
                  <div className="font-bold text-lg text-primary">
                    {itemPricing.totalPrice} {variables.curancy.egp}
                  </div>
                  {itemPricing.addonsPrice > 0 && (
                    <div className="text-xs text-muted-foreground">
                      شامل الإضافات: {itemPricing.addonsPrice}{" "}
                      {variables.curancy.egp}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">ملاحظات خاصة</h3>
              <Textarea
                placeholder="أضف أي ملاحظات أو طلبات خاصة..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[80px] resize-none"
                maxLength={200}
              />
              <div className="text-xs text-muted-foreground mt-1 text-left">
                {note.length}/200
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer - Add to Cart Button */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t p-4">
        <Button
          onClick={handleAddToCart}
          className="w-full h-12 text-lg font-semibold rounded-full"
          size="lg"
        >
          <ShoppingCart className="w-5 h-5 ml-2" />
          إضافة للسلة • {itemPricing.totalPrice} {variables.curancy.egp}
        </Button>
      </div>
    </div>
  );
};

export default ItemPage;
