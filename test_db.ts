import { getDashboard, listOrders } from "./src/server/admin-queries.ts";

async function run() {
  try {
    console.log("Fetching dashboard...");
    const d = await getDashboard();
    console.log("Dashboard success", Object.keys(d));
    
    console.log("Fetching orders...");
    const o = await listOrders({ q: "", status: "", page: 1 });
    console.log("Orders success", o.total);
  } catch (err) {
    console.error("Crash:", err.message);
  }
}

run();
