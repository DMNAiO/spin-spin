const fs = require("fs");
const path = require("path");

function readDotEnv() {
    const envPath = path.join(__dirname, ".env");

    if (!fs.existsSync(envPath)) {
        return {};
    }

    return Object.fromEntries(
        fs.readFileSync(envPath, "utf8")
            .split(/\r?\n/)
            .filter(line => line.trim() && !line.trim().startsWith("#"))
            .map(line => {
                const separator = line.indexOf("=");

                if (separator < 0) {
                    return [line.trim(), ""];
                }

                const key = line.slice(0, separator).trim();
                const value = line.slice(separator + 1).trim();

                return [
                    key,
                    value.replace(/^['"]|['"]$/g, "")
                ];
            })
    );
}

const dotEnv = readDotEnv();
const supabaseUrl = process.env.SUPABASE_URL || dotEnv.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || dotEnv.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        "SUPABASE_URL dan SUPABASE_ANON_KEY wajib diisi di .env atau environment variables."
    );
}

const output = `window.SUPABASE_CONFIG = ${JSON.stringify(
    {
        url: supabaseUrl,
        anonKey: supabaseAnonKey
    },
    null,
    4
)};\n`;

fs.writeFileSync(
    path.join(__dirname, "supabase-config.js"),
    output,
    "utf8"
);

console.log("supabase-config.js berhasil dibuat.");
