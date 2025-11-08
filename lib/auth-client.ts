import { createAuthClient } from "better-auth/client";
import { adminClient } from "better-auth/client/plugins";

const authClient = createAuthClient({
  plugins: [adminClient()],
});

const { useSession, signOut } = createAuthClient();

export { useSession, signOut, authClient };
