# ForgeKit Licensing API Documentation

ForgeKit provides a universal API that allows you to easily connect any software you build (Desktop Apps, CLI tools, Scripts, etc.) to your digital storefront. This prevents unauthorized sharing and automatically enforces license expirations.

This document outlines how to integrate your software with the ForgeKit backend.

---

## The Workflow

1. A customer buys your software on your storefront. ForgeKit automatically generates a unique `license_key` (e.g. `FKIT-7Q2M-K9XD`) and emails it to them.
2. The customer opens your software and is prompted to enter their key.
3. Your software captures their unique `machine_id` (so they can't share the key with others) and calls the **Activation Endpoint**.
4. Every subsequent time the customer opens the app, your software silently calls the **Verification Endpoint** in the background to ensure you haven't revoked their license.

---

## 1. Activation Endpoint

**Use Case:** Call this exactly once when the user pastes their license key into your app.

`POST /api/v1/licenses/activate`

### Request Payload (JSON)
```json
{
  "license_key": "FKIT-XXXX-XXXX-XXXX",
  "machine_id": "unique-device-identifier",
  "product_slug": "your-product-slug"
}
```

- **`license_key`**: The key the user purchased.
- **`machine_id`**: A unique string for the user's computer. (In Node/Electron, use `node-machine-id`. In Python, use `uuid.getnode()`).
- **`product_slug`**: The URL slug of your product (e.g. `invoice-kit`). This ensures they don't try to use a cheap key to unlock your expensive software.

### Response

**Success (200 OK)**
```json
{
  "valid": true,
  "message": "Machine activated successfully",
  "activations": 1,
  "max_activations": 3
}
```

**Errors (403 Forbidden / 404 Not Found)**
```json
{
  "error": "Activation limit reached" // Or "License has expired", "Invalid license key", etc.
}
```

---

## 2. Verification Endpoint

**Use Case:** Call this silently in the background every time your app boots up to make sure the license is still valid.

`POST /api/v1/licenses/verify`

### Request Payload (JSON)
```json
{
  "license_key": "FKIT-XXXX-XXXX-XXXX",
  "machine_id": "unique-device-identifier",
  "product_slug": "your-product-slug"
}
```

### Response

**Success (200 OK)**
```json
{
  "valid": true,
  "message": "License verified successfully"
}
```

**Errors (403 Forbidden / 404 Not Found)**
```json
{
  "error": "Machine not activated for this license" // Or "License is revoked"
}
```

---

## Best Practices for Developers

1. **Don't hardcode API Keys**: Your software lives on the user's computer, so any API keys can be extracted. ForgeKit's API is designed so you *don't* need an API key. The `license_key` itself is the secret.
2. **Handle Offline Users**: If the `/verify` endpoint times out (e.g. the user is on an airplane), you should allow them to use the app anyway, but track the timestamp. Force a verification every 7 days.
3. **Use the Admin Panel**: The exact Javascript `fetch` code you need for a specific product is automatically generated for you in the ForgeKit Admin Panel under the **"API Integration"** section when you edit a product.
