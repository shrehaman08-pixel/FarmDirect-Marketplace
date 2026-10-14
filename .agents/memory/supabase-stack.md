---
name: FarmDirect Supabase stack
description: FarmDirect's backend and file services must stay on Supabase.
---

FarmDirect must use Supabase only for its backend and data services. Do not replace it with Replit Database, Replit Auth, or Replit Object Storage.

**Why:** The user specified a portable React/Vite app backed only by Supabase.

**How to apply:** Use Supabase Auth, Postgres, Storage, Edge Functions/RPC, and the Supabase client for app features; keep credentials in environment variables.
