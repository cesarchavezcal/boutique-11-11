# Boutique 11:11

## Run Locally

### Prisma Generation

```bash
 cd apps/order-manager && npx prisma format && npx prisma generate
```

### SSL serve
```bash
nx serve order-manager --ssl true --ssl-key ./localhost.key --ssl-cert ./localhost.crt --disable-host-check
```