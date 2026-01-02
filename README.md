# Fractional Assets Platform

A modern platform for fractional ownership of real estate assets, enabling accessible investment opportunities in high-growth areas like Dholera. Built with Next.js 15, Supabase, and Tailwind CSS.

## 🚀 Features

- **Property Marketplace**: Browse and filter investment properties with detailed financial metrics.
- **Fractional Ownership**: Invest in high-value assets with lower capital requirements.
- **Detailed Analytics**: View projected appreciation, rental yields, and growth charts.
- **User Dashboard**: Track portfolio performance, investments, and account details.
- **Secure Authentication**: Email and password authentication via Supabase Auth.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS and Framer Motion.
- **Educational Resources**: Dedicated sections for learning about fractional investment and market insights.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email**: [Resend](https://resend.com/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- A Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tanishqgupta599-hub/fractional.git
   cd fractional
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   RESEND_API_KEY=your_resend_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
src/
├── app/                  # Next.js App Router pages and layouts
│   ├── (auth)/           # Authentication routes (login, signup, etc.)
│   ├── about/            # About Us page
│   ├── dashboard/        # User dashboard
│   ├── properties/       # Property listing and details
│   └── ...               # Other static pages
├── components/           # Reusable UI components
│   ├── ui/               # Base UI elements (Button, Card, etc.)
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions and Supabase configuration
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
