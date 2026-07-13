import type { TemplateFile, GeneratorOptions } from "./types";
import { renderTemplate } from "./renderer";

const templateGlob: Record<string, Record<string, string>> = {
  nextjs: {},
  express: {},
  fastapi: {},
  "go-templ": {},
  rails: {},
  laravel: {},
};

export function composeProject(options: GeneratorOptions): TemplateFile[] {
  const files: TemplateFile[] = [];

  const frameworkTemplates = getFrameworkTemplates(options.framework);
  const sharedTemplates = getSharedTemplates(options);

  for (const t of [...sharedTemplates, ...frameworkTemplates]) {
    files.push({
      path: t.path,
      content: renderTemplate(t.content, options),
    });
  }

  return files;
}

function getFrameworkTemplates(framework: string): TemplateFile[] {
  switch (framework) {
    case "nextjs":
      return getNextJSTemplates();
    case "express":
      return getExpressTemplates();
    case "fastapi":
      return getFastAPITemplates();
    case "go-templ":
      return getGoTemplTemplates();
    case "rails":
      return getRailsTemplates();
    case "laravel":
      return getLaravelTemplates();
    default:
      return [];
  }
}

function getSharedTemplates(options: GeneratorOptions): TemplateFile[] {
  const files: TemplateFile[] = [
    {
      path: ".env.example",
      content: `# {{projectName}}
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
`,
    },
    {
      path: ".gitignore",
      content: `node_modules/
.next/
.env
.env.local
dist/
build/
*.pyc
__pycache__/
`,
    },
    {
      path: "README.md",
      content: `# {{projectName}}

A SaaS application built with {{framework}}.

## Quick Start

1. Clone the repo
2. Copy \`.env.example\` to \`.env\` and fill in your values
3. Install dependencies
4. Run the development server

## Features

- JWT Authentication
- Supabase Database
- {{#ifCond ui '!==' 'minimal'}}Beautiful UI with {{ui}}{{/ifCond}}
- CI/CD with GitHub Actions
- Deploy to {{deployment}}

## License

MIT
`,
    },
  ];

  return files;
}

function getNextJSTemplates(): TemplateFile[] {
  return [
    {
      path: "package.json",
      content: JSON.stringify({
        name: "{{projectName}}",
        version: "0.1.0",
        private: true,
        scripts: {
          dev: "next dev",
          build: "next build",
          start: "next start",
          lint: "next lint",
          test: "vitest run",
        },
        dependencies: {
          next: "^14.2.0",
          react: "^18.3.0",
          "react-dom": "^18.3.0",
          "@supabase/supabase-js": "^2.45.0",
          "@supabase/ssr": "^0.5.0",
          "class-variance-authority": "^0.7.0",
          clsx: "^2.1.0",
          "tailwind-merge": "^2.5.0",
          "lucide-react": "^0.451.0",
          "next-themes": "^0.3.0",
          "jsonwebtoken": "^9.0.0",
          bcryptjs: "^2.4.3",
        },
        devDependencies: {
          typescript: "^5.5.0",
          "@types/node": "^20.0.0",
          "@types/react": "^18.3.0",
          "@types/react-dom": "^18.3.0",
          "@types/jsonwebtoken": "^9.0.0",
          "@types/bcryptjs": "^2.4.0",
          tailwindcss: "^3.4.0",
          postcss: "^8.4.0",
          autoprefixer: "^10.4.0",
          vitest: "^2.0.0",
          eslint: "^9.0.0",
          "eslint-config-next": "^14.2.0",
        },
      }, null, 2),
    },
    {
      path: "tsconfig.json",
      content: JSON.stringify({
        compilerOptions: {
          target: "ES2017",
          lib: ["dom", "dom.iterable", "esnext"],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: "esnext",
          moduleResolution: "bundler",
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: "react-jsx",
          incremental: true,
          plugins: [{ name: "next" }],
          paths: { "@/*": ["./src/*"] },
        },
        include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
        exclude: ["node_modules"],
      }, null, 2),
    },
    {
      path: "next.config.ts",
      content: `import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
`,
    },
    {
      path: "tailwind.config.ts",
      content: `import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
`,
    },
    {
      path: "src/lib/supabase/client.ts",
      content: `import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
`,
    },
    {
      path: "src/lib/supabase/server.ts",
      content: `import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    },
  );
}
`,
    },
    {
      path: "src/middleware.ts",
      content: `import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\\\\\\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
`,
    },
    {
      path: "src/app/layout.tsx",
      content: `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "{{projectName}}",
  description: "A SaaS application built with {{framework}}",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`,
    },
    {
      path: "src/app/(auth)/login/page.tsx",
      content: `"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 p-8">
        <h1 className="text-2xl font-bold">Sign in</h1>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm"
          required
        />
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
`,
    },
    {
      path: "src/app/(auth)/signup/page.tsx",
      content: `"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4 p-8">
        <h1 className="text-2xl font-bold">Create account</h1>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm"
          required
        />
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
`,
    },
    {
      path: "src/app/dashboard/page.tsx",
      content: `export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">Welcome to {{projectName}}.</p>
    </div>
  );
}
`,
    },
    {
      path: "src/app/globals.css",
      content: `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
    },
    {
      path: ".github/workflows/ci.yml",
      content: `name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm test
`,
    },
    {
      path: "vercel.json",
      content: JSON.stringify({ framework: "nextjs" }, null, 2),
    },
  ];
}

function getExpressTemplates(): TemplateFile[] {
  return [
    {
      path: "package.json",
      content: JSON.stringify({
        name: "{{projectName}}",
        version: "0.1.0",
        private: true,
        scripts: {
          dev: "tsx watch src/index.ts",
          build: "tsc",
          start: "node dist/index.js",
          test: "vitest run",
          lint: "eslint src/",
        },
        dependencies: {
          express: "^4.21.0",
          "@supabase/supabase-js": "^2.45.0",
          jsonwebtoken: "^9.0.0",
          bcryptjs: "^2.4.3",
          cors: "^2.8.5",
          helmet: "^7.1.0",
          dotenv: "^16.4.0",
          ejs: "^3.1.0",
        },
        devDependencies: {
          typescript: "^5.5.0",
          "@types/express": "^4.17.0",
          "@types/node": "^20.0.0",
          "@types/jsonwebtoken": "^9.0.0",
          "@types/bcryptjs": "^2.4.0",
          "@types/cors": "^2.8.0",
          tsx: "^4.19.0",
          vitest: "^2.0.0",
          eslint: "^9.0.0",
        },
      }, null, 2),
    },
    {
      path: "tsconfig.json",
      content: JSON.stringify({
        compilerOptions: {
          target: "ES2020",
          module: "commonjs",
          lib: ["ES2020"],
          outDir: "./dist",
          rootDir: "./src",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          resolveJsonModule: true,
          declaration: true,
        },
        include: ["src"],
        exclude: ["node_modules", "dist"],
      }, null, 2),
    },
    {
      path: "src/index.ts",
      content: `import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth";
import { dashboardRouter } from "./routes/dashboard";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");

app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);

app.get("/", (_req, res) => {
  res.json({ message: "{{projectName}} API" });
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
`,
    },
    {
      path: "src/lib/supabase.ts",
      content: `import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
`,
    },
    {
      path: "src/middleware/auth.ts",
      content: `import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret";

export interface AuthRequest extends Request {
  userId?: string;
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
`,
    },
    {
      path: "src/routes/auth.ts",
      content: `import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../lib/supabase";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret";

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const { data, error } = await supabase
    .from("users")
    .insert({ email, password_hash: hashedPassword })
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  const token = jwt.sign({ userId: data.id }, JWT_SECRET);
  res.json({ token, user: data });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (error || !user) return res.status(401).json({ error: "Invalid credentials" });
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.json({ token, user });
});

export { router as authRouter };
`,
    },
    {
      path: "src/routes/dashboard.ts",
      content: `import { Router } from "express";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

router.get("/", authenticate, (req: AuthRequest, res) => {
  res.json({ message: "Welcome to your dashboard!", userId: req.userId });
});

export { router as dashboardRouter };
`,
    },
    {
      path: ".env.example",
      content: `SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
PORT=3000
`,
    },
    {
      path: ".github/workflows/ci.yml",
      content: `name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm test
`,
    },
    {
      path: "Dockerfile",
      content: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
`,
    },
  ];
}

function getFastAPITemplates(): TemplateFile[] {
  return [
    {
      path: "requirements.txt",
      content: `fastapi==0.115.0
uvicorn[standard]==0.30.0
supabase==2.5.0
pyjwt==2.9.0
bcrypt==4.2.0
pydantic==2.9.0
python-dotenv==1.0.0
`,
    },
    {
      path: "pyproject.toml",
      content: `[project]
name = "{{projectName}}"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
    "fastapi>=0.115.0",
    "uvicorn[standard]>=0.30.0",
    "supabase>=2.5.0",
    "pyjwt>=2.9.0",
    "bcrypt>=4.2.0",
    "pydantic>=2.9.0",
    "python-dotenv>=1.0.0",
]
`,
    },
    {
      path: "src/main.py",
      content: `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from src.routes import auth, dashboard

load_dotenv()

app = FastAPI(title="{{projectName}}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])

@app.get("/")
def root():
    return {"message": "{{projectName}} API"}
`,
    },
    {
      path: "src/lib/supabase.py",
      content: `import os
from supabase import create_client, Client

supabase_url = os.getenv("SUPABASE_URL", "")
supabase_key = os.getenv("SUPABASE_ANON_KEY", "")
supabase: Client = create_client(supabase_url, supabase_key)
`,
    },
    {
      path: "src/lib/auth.py",
      content: `import jwt
import bcrypt
import os
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

JWT_SECRET = os.getenv("JWT_SECRET", "your-jwt-secret")
security = HTTPBearer()

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed.encode())

def create_token(user_id: str) -> str:
    return jwt.encode({"user_id": user_id}, JWT_SECRET, algorithm="HS256")

def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=["HS256"])
        return payload["user_id"]
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
`,
    },
    {
      path: "src/routes/auth.py",
      content: `from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from src.lib.supabase import supabase
from src.lib.auth import hash_password, verify_password, create_token

router = APIRouter()

class SignupRequest(BaseModel):
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/signup")
def signup(req: SignupRequest):
    hashed = hash_password(req.password)
    data = supabase.table("users").insert({
        "email": req.email,
        "password_hash": hashed,
    }).execute()
    if not data.data:
        raise HTTPException(status_code=400, detail="Signup failed")
    user = data.data[0]
    token = create_token(user["id"])
    return {"token": token, "user": user}

@router.post("/login")
def login(req: LoginRequest):
    data = supabase.table("users").select("*").eq("email", req.email).execute()
    if not data.data:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    user = data.data[0]
    if not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(user["id"])
    return {"token": token, "user": user}
`,
    },
    {
      path: "src/routes/dashboard.py",
      content: `from fastapi import APIRouter, Depends
from src.lib.auth import verify_token

router = APIRouter()

@router.get("/")
def dashboard(user_id: str = Depends(verify_token)):
    return {"message": "Welcome to your dashboard!", "user_id": user_id}
`,
    },
    {
      path: ".env.example",
      content: `SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
`,
    },
    {
      path: "Dockerfile",
      content: `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
`,
    },
    {
      path: ".github/workflows/ci.yml",
      content: `name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - run: pip install -r requirements.txt
      - run: pip install pytest
      - run: pytest
`,
    },
  ];
}

function getGoTemplTemplates(): TemplateFile[] {
  return [
    {
      path: "go.mod",
      content: `module github.com/{{projectName}}

go 1.22

require (
	github.com/gin-gonic/gin v1.10.0
	github.com/golang-jwt/jwt/v5 v5.2.0
	github.com/supabase-community/supabase-go v0.0.4
	golang.org/x/crypto v0.28.0
	github.com/joho/godotenv v1.5.1
	github.com/a-h/templ v0.2.793
)
`,
    },
    {
      path: "cmd/server/main.go",
      content: `package main

import (
	"log"
	"os"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/{{projectName}}/internal/handlers"
	"github.com/{{projectName}}/internal/middleware"
)

func main() {
	godotenv.Load()
	r := gin.Default()

	r.POST("/auth/signup", handlers.Signup)
	r.POST("/auth/login", handlers.Login)

	auth := r.Group("/dashboard")
	auth.Use(middleware.Auth())
	{
		auth.GET("/", handlers.Dashboard)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server running on port %s", port)
	r.Run(":" + port)
}
`,
    },
    {
      path: "internal/lib/supabase.go",
      content: `package lib

import (
	"os"
	"github.com/supabase-community/supabase-go"
)

func NewSupabase() (*supabase.Client, error) {
	url := os.Getenv("SUPABASE_URL")
	key := os.Getenv("SUPABASE_ANON_KEY")
	return supabase.NewClient(url, key, nil)
}
`,
    },
    {
      path: "internal/lib/auth.go",
      content: `package lib

import (
	"os"
	"time"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func CreateToken(userID string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func ValidateToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})
	if err != nil {
		return "", err
	}
	claims := token.Claims.(jwt.MapClaims)
	return claims["user_id"].(string), nil
}
`,
    },
    {
      path: "internal/handlers/auth.go",
      content: `package handlers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/{{projectName}}/internal/lib"
)

type AuthRequest struct {
	Email    string \`json:"email" binding:"required"\`
	Password string \`json:"password" binding:"required"\`
}

func Signup(c *gin.Context) {
	var req AuthRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	hashed, err := lib.HashPassword(req.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}
	sb, err := lib.NewSupabase()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "DB connection failed"})
		return
	}
	var results []map[string]interface{}
	if err := sb.From("users").Insert(map[string]interface{}{
		"email":         req.Email,
		"password_hash": hashed,
	}, false, "", "", "").Execute(&results); err != nil || len(results) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Signup failed"})
		return
	}
	token, _ := lib.CreateToken(results[0]["id"].(string))
	c.JSON(http.StatusOK, gin.H{"token": token, "user": results[0]})
}

func Login(c *gin.Context) {
	var req AuthRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	sb, err := lib.NewSupabase()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "DB connection failed"})
		return
	}
	var results []map[string]interface{}
	if err := sb.From("users").Select("*").Eq("email", req.Email).Execute(&results); err != nil || len(results) == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}
	user := results[0]
	if !lib.CheckPassword(req.Password, user["password_hash"].(string)) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}
	token, _ := lib.CreateToken(user["id"].(string))
	c.JSON(http.StatusOK, gin.H{"token": token, "user": user})
}
`,
    },
    {
      path: "internal/handlers/dashboard.go",
      content: `package handlers

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func Dashboard(c *gin.Context) {
	userID, _ := c.Get("user_id")
	c.JSON(http.StatusOK, gin.H{
		"message": "Welcome to your dashboard!",
		"user_id": userID,
	})
}
`,
    },
    {
      path: "internal/middleware/auth.go",
      content: `package middleware

import (
	"net/http"
	"strings"
	"github.com/gin-gonic/gin"
	"github.com/{{projectName}}/internal/lib"
)

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		token := strings.TrimPrefix(authHeader, "Bearer ")
		userID, err := lib.ValidateToken(token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}
		c.Set("user_id", userID)
		c.Next()
	}
}
`,
    },
    {
      path: ".env.example",
      content: `SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
PORT=8080
`,
    },
    {
      path: "Dockerfile",
      content: `FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o server ./cmd/server

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/server .
EXPOSE 8080
CMD ["./server"]
`,
    },
  ];
}

function getRailsTemplates(): TemplateFile[] {
  return [
    {
      path: "Gemfile",
      content: `source "https://rubygems.org"

ruby ">= 3.2.0"

gem "rails", "~> 7.2"
gem "pg"
gem "puma", ">= 6.0"
gem "bcrypt", "~> 3.1"
gem "jwt", "~> 2.8"
gem "rack-cors"
gem "bootsnap", require: false

group :development, :test do
  gem "rspec-rails", "~> 7.0"
  gem "rubocop", require: false
end
`,
    },
    {
      path: "config/routes.rb",
      content: `Rails.application.routes.draw do
  namespace :api do
    post "auth/signup", to: "auth#signup"
    post "auth/login", to: "auth#login"
    get "dashboard", to: "dashboard#index"
  end
end
`,
    },
    {
      path: "app/controllers/api/auth_controller.rb",
      content: `module Api
  class AuthController < ApplicationController
    def signup
      user = User.new(email: params[:email], password: params[:password])
      if user.save
        token = JwtService.encode(user_id: user.id)
        render json: { token: token, user: user.as_json(only: [:id, :email]) }
      else
        render json: { error: user.errors.full_messages.join(", ") }, status: :unprocessable_entity
      end
    end

    def login
      user = User.find_by(email: params[:email])
      if user&.authenticate(params[:password])
        token = JwtService.encode(user_id: user.id)
        render json: { token: token, user: user.as_json(only: [:id, :email]) }
      else
        render json: { error: "Invalid credentials" }, status: :unauthorized
      end
    end
  end
end
`,
    },
    {
      path: "app/controllers/api/dashboard_controller.rb",
      content: `module Api
  class DashboardController < ApplicationController
    before_action :authenticate

    def index
      render json: { message: "Welcome to your dashboard!", user_id: @current_user_id }
    end
  end
end
`,
    },
    {
      path: "app/controllers/application_controller.rb",
      content: `class ApplicationController < ActionController::API
  private

  def authenticate
    header = request.headers["Authorization"]
    token = header&.split(" ")&.last
    if token
      decoded = JwtService.decode(token)
      @current_user_id = decoded[:user_id] if decoded
    end
    render json: { error: "Unauthorized" }, status: :unauthorized unless @current_user_id
  rescue JWT::DecodeError
    render json: { error: "Invalid token" }, status: :unauthorized
  end
end
`,
    },
    {
      path: "app/models/user.rb",
      content: `class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true, uniqueness: true
end
`,
    },
    {
      path: "app/services/jwt_service.rb",
      content: `class JwtService
  SECRET = ENV["JWT_SECRET"] || "your-jwt-secret"

  def self.encode(payload)
    JWT.encode(payload.merge(exp: 24.hours.from_now.to_i), SECRET, "HS256")
  end

  def self.decode(token)
    JWT.decode(token, SECRET, true, algorithm: "HS256").first.symbolize_keys
  end
end
`,
    },
    {
      path: "config/database.yml",
      content: `default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: {{projectName}}_development
  url: <%= ENV["DATABASE_URL"] %>

production:
  <<: *default
  database: {{projectName}}_production
  url: <%= ENV["DATABASE_URL"] %>
`,
    },
    {
      path: "db/migrate/20240101000001_create_users.rb",
      content: `class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
`,
    },
    {
      path: ".env.example",
      content: `SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=postgres://localhost:5432/{{projectName}}
JWT_SECRET=your_jwt_secret
`,
    },
    {
      path: "Dockerfile",
      content: `FROM ruby:3.3-slim
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY . .
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
`,
    },
  ];
}

function getLaravelTemplates(): TemplateFile[] {
  return [
    {
      path: "composer.json",
      content: JSON.stringify({
        name: "{{projectName}}/app",
        require: {
          php: ">=8.2",
          "laravel/framework": "^11.0",
          "laravel/sanctum": "^4.0",
          "laravel/cashier": "^15.0",
        },
        "require-dev": {
          "pestphp/pest": "^3.0",
          "laravel/sail": "^1.0",
        },
        autoload: {
          "psr-4": {
            "App\\": "app/",
            "Database\\Factories\\": "database/factories/",
            "Database\\Seeders\\": "database/seeders/",
          },
        },
      }, null, 2),
    },
    {
      path: "routes/api.php",
      content: `<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::post("/auth/signup", [AuthController::class, "signup"]);
Route::post("/auth/login", [AuthController::class, "login"]);

Route::middleware("auth:sanctum")->group(function () {
    Route::get("/dashboard", [DashboardController::class, "index"]);
});
`,
    },
    {
      path: "app/Http/Controllers/AuthController.php",
      content: `<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signup(Request $request): JsonResponse
    {
        $validated = $request->validate([
            "email" => "required|email|unique:users",
            "password" => "required|min:8",
        ]);

        $user = User::create([
            "email" => $validated["email"],
            "password" => Hash::make($validated["password"]),
        ]);

        $token = $user->createToken("auth-token")->plainTextToken;

        return response()->json([
            "token" => $token,
            "user" => ["id" => $user->id, "email" => $user->email],
        ]);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            "email" => "required|email",
            "password" => "required",
        ]);

        $user = User::where("email", $validated["email"])->first();

        if (!$user || !Hash::check($validated["password"], $user->password)) {
            return response()->json(["error" => "Invalid credentials"], 401);
        }

        $token = $user->createToken("auth-token")->plainTextToken;

        return response()->json([
            "token" => $token,
            "user" => ["id" => $user->id, "email" => $user->email],
        ]);
    }
}
`,
    },
    {
      path: "app/Http/Controllers/DashboardController.php",
      content: `<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            "message" => "Welcome to your dashboard!",
            "user_id" => auth()->id(),
        ]);
    }
}
`,
    },
    {
      path: "app/Models/User.php",
      content: `<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = ["email", "password"];
    protected $hidden = ["password"];
}
`,
    },
    {
      path: "database/migrations/2024_01_01_000001_create_users_table.php",
      content: `<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create("users", function (Blueprint $table) {
            $table->id();
            $table->string("email")->unique();
            $table->string("password");
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("users");
    }
};
`,
    },
    {
      path: ".env.example",
      content: `APP_NAME={{projectName}}
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE={{projectName}}
DB_USERNAME=root
DB_PASSWORD=

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
`,
    },
    {
      path: "Dockerfile",
      content: `FROM php:8.2-fpm
RUN apt-get update && apt-get install -y libpq-dev
RUN docker-php-ext-install pdo_pgsql
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /app
COPY . .
RUN composer install --no-dev
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
`,
    },
  ];
}
