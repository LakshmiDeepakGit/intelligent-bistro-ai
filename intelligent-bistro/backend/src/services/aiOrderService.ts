import { MENU_ITEMS } from "../data/menu";

interface ParsedAction {
  type: "ADD_ITEM" | "REMOVE_ITEM" | "CLEAR_CART";
  itemId?: number;
  quantity?: number;
}

interface AIResponse {
  message: string;
  actions: ParsedAction[];
}

let lastReferencedItem: any = null;

function extractQuantity(text: string): number {

  if (
    text.includes("five") ||
    text.includes("5")
  )
    return 5;

  if (
    text.includes("four") ||
    text.includes("4")
  )
    return 4;

  if (
    text.includes("three") ||
    text.includes("3")
  )
    return 3;

  if (
    text.includes("two") ||
    text.includes("2")
  )
    return 2;

  return 1;
}

function addAction(
  actions: ParsedAction[],
  addedItems: string[],
  item: any,
  quantity: number
) {

  const existing =
    actions.find(
      (action) =>
        action.itemId === item.id
    );

  if (existing) {

    existing.quantity =
      (existing.quantity || 1) +
      quantity;

    return;
  }

  actions.push({
    type: "ADD_ITEM",
    itemId: item.id,
    quantity,
  });

  addedItems.push(
    `${quantity} ${item.title}`
  );

  lastReferencedItem = item;
}

export function processOrderMessage(
  userMessage: string
): AIResponse {

  let remainingMessage =
    userMessage.toLowerCase();

  const actions:
    ParsedAction[] = [];

  const addedItems:
    string[] = [];

  /*
    =========================
    CLEAR CART
    =========================
  */

  if (
    remainingMessage.includes(
      "clear cart"
    )
  ) {

    return {
      message:
        "Your cart has been cleared.",
      actions: [
        {
          type: "CLEAR_CART",
        },
      ],
    };
  }

  /*
    =========================
    REMOVE ITEM
    =========================
  */

  if (
    remainingMessage.includes(
      "remove"
    )
  ) {

    const matchedItem =
      MENU_ITEMS.find(
        (item) =>
          remainingMessage.includes(
            item.title.toLowerCase()
          )
      );

    if (matchedItem) {

      return {
        message:
          `${matchedItem.title} removed from your cart.`,
        actions: [
          {
            type: "REMOVE_ITEM",
            itemId:
              matchedItem.id,
          },
        ],
      };
    }

    if (
      remainingMessage.includes(
        "remove it"
      ) &&
      lastReferencedItem
    ) {

      return {
        message:
          `${lastReferencedItem.title} removed from your cart.`,
        actions: [
          {
            type: "REMOVE_ITEM",
            itemId:
              lastReferencedItem.id,
          },
        ],
      };
    }
  }

  /*
    =========================
    ADD ANOTHER
    =========================
  */

  if (
    remainingMessage.includes(
      "another"
    ) &&
    lastReferencedItem
  ) {

    return {
      message:
        `Added another ${lastReferencedItem.title}.`,
      actions: [
        {
          type: "ADD_ITEM",
          itemId:
            lastReferencedItem.id,
          quantity: 1,
        },
      ],
    };
  }

  /*
    =========================
    SPECIAL REQUESTS
    =========================
  */

  if (
    remainingMessage.includes(
      "best dessert"
    ) ||
    remainingMessage.includes(
      "recommend dessert"
    )
  ) {

    const dessert =
      MENU_ITEMS.find(
        (item) =>
          item.category ===
          "Desserts"
      );

    if (dessert) {

      addAction(
        actions,
        addedItems,
        dessert,
        1
      );
    }
  }

  if (
    remainingMessage.includes(
      "spicy food"
    ) ||
    remainingMessage.includes(
      "something spicy"
    )
  ) {

    const spicyItem =
      MENU_ITEMS.find(
        (item) =>
          item.spicy
      );

    if (spicyItem) {

      addAction(
        actions,
        addedItems,
        spicyItem,
        1
      );
    }
  }

  /*
    =========================
    EXACT MENU MATCHING
    =========================
  */

  const sortedMenu =
    [...MENU_ITEMS].sort(
      (a, b) =>
        b.title.length -
        a.title.length
    );

  for (const item of sortedMenu) {

    const title =
      item.title.toLowerCase();

    if (
      remainingMessage.includes(
        title
      )
    ) {

      const quantity =
        extractQuantity(
          remainingMessage
        );

      addAction(
        actions,
        addedItems,
        item,
        quantity
      );

      /*
        REMOVE MATCHED TEXT
        prevents duplicate overlaps
      */

      remainingMessage =
        remainingMessage.replace(
          title,
          ""
        );
    }
  }

  /*
    =========================
    FALLBACK ALIAS MATCHING
    =========================
  */

  for (const item of sortedMenu) {

    for (const alias of item.aliases) {

      if (
        remainingMessage.includes(
          alias
        )
      ) {

        const quantity =
          extractQuantity(
            remainingMessage
          );

        addAction(
          actions,
          addedItems,
          item,
          quantity
        );

        remainingMessage =
          remainingMessage.replace(
            alias,
            ""
          );

        break;
      }
    }
  }

  /*
    =========================
    NO MATCHES
    =========================
  */

  if (
    actions.length === 0
  ) {

    return {
      message:
        "I couldn’t understand that order. Try asking for bowls, tacos, burritos, desserts or drinks.",
      actions: [],
    };
  }

  /*
    =========================
    FINAL RESPONSE
    =========================
  */

  return {
    message:
      `Perfect! I added ${addedItems.join(
        ", "
      )} to your cart.`,

    actions,
  };
}