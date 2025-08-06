import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowRight, Code, Zap, Palette, Download, Github, ExternalLink, Play, Star } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">FC</span>
                            </div>
                            <span className="font-bold text-lg sm:text-xl text-gray-900">Formcarve</span>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <Link href="/builder" className="text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base">
                                Builder
                            </Link>
                            <Link href="https://github.com/allenarduino/formcarve" className="text-gray-600 hover:text-gray-900 transition-colors p-1">
                                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>
                            <Button size="sm" className="hidden sm:inline-flex bg-gray-900 hover:bg-gray-800" asChild>
                                <Link href="/builder">
                                    Try Builder
                                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                                </Link>
                            </Button>
                            <Button size="sm" className="sm:hidden bg-gray-900 hover:bg-gray-800" asChild>
                                <Link href="/builder">
                                    Try
                                    <ArrowRight className="w-3 h-3 ml-1" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    <div className="text-center">
                        <Badge variant="secondary" className="mb-6 bg-gray-100 text-gray-700 border-gray-200">
                            <Star className="w-3 h-3 mr-1" />
                            New Introducing Form Builder
                        </Badge>

                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Build React Forms
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900">
                                Without Writing Code
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Turn your form requirements into powerful React components. Easy. Fast. No code required.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button size="lg" asChild className="bg-gray-900 hover:bg-gray-800">
                                <Link href="/builder">
                                    <Play className="w-5 h-5 mr-2" />
                                    Try the Builder
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="border-gray-300 text-gray-700 hover:bg-gray-50">
                                <Link href="https://www.npmjs.com/package/@jonesstack/react-form-engine">
                                    <Download className="w-5 h-5 mr-2" />
                                    Install Package
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Everything You Need for Form Development
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            From visual building to production-ready forms, FormCarve handles the entire workflow.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                    <Palette className="w-6 h-6 text-gray-700" />
                                </div>
                                <CardTitle className="text-xl">Visual Builder</CardTitle>
                                <CardDescription className="text-base">
                                    Drag-and-drop interface to create forms with ease. Configure properties, validation rules, and styling without touching code.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <Code className="w-6 h-6 text-blue-600" />
                                </div>
                                <CardTitle className="text-xl">JSON Schema</CardTitle>
                                <CardDescription className="text-base">
                                    Export your forms as portable JSON schemas. Version control friendly and easily shareable across teams.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                            <CardHeader>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-green-600" />
                                </div>
                                <CardTitle className="text-xl">React Component</CardTitle>
                                <CardDescription className="text-base">
                                    Single &lt;FormRenderer /&gt; component to render any form. Handles validation, state management, and styling automatically.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Three simple steps from idea to production-ready form
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white font-bold text-xl">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Build Visually</h3>
                            <p className="text-gray-600">
                                Use the drag-and-drop builder to create your form. Add fields, configure validation, and style your form.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white font-bold text-xl">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Export JSON</h3>
                            <p className="text-gray-600">
                                Export your form as a clean JSON schema. Version control it, share it, or store it in your database.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white font-bold text-xl">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Render Anywhere</h3>
                            <p className="text-gray-600">
                                Use the &lt;FormRenderer /&gt; component in any React project. No backend, no config, just React + JSON.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Code Example Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Simple Integration
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Drop in the component and you're ready to go
                        </p>
                    </div>

                    <div className="bg-gray-900 rounded-xl p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-gray-400 text-sm">example.jsx</span>
                        </div>
                        <pre className="text-gray-100 overflow-x-auto">
                            <code>{`import { FormRenderer } from '@jonesstack/react-form-engine';

const formSchema = {
  formName: "User Registration",
  formFields: [
    {
      id: "email",
      type: "email", 
      label: "Email Address",
      placeholder: "Enter your email",
      required: true,
      validation: {
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        customMessage: "Please enter a valid email"
      }
    },
    {
      id: "password",
      type: "password",
      label: "Password", 
      required: true,
      validation: {
        minLength: 8,
        pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$",
        customMessage: "Password must be 8+ chars with uppercase, lowercase, and number"
      }
    }
  ]
};

function MyForm() {
  const handleSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <FormRenderer 
      schema={formSchema} 
      onSubmit={handleSubmit}
    />
  );
}`}</code>
                        </pre>
                    </div>
                </div>
            </section>

            {/* Demo Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            See It In Action
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Experience the FormCarve builder interface
                        </p>
                    </div>

                    <div className="relative">
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-4 h-4 border border-gray-300 rounded"></div>
                                        <div className="w-4 h-4 border border-gray-300 rounded"></div>
                                        <div className="w-4 h-4 border border-gray-300 rounded"></div>
                                    </div>
                                    <span className="text-gray-500 text-sm">FormCarve Builder</span>
                                </div>
                            </div>
                            <div className="relative">
                                <Image
                                    src="/Screenshot 2025-07-17 at 18.50.05.png"
                                    alt="FormCarve Builder Interface"
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-900">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Build Better Forms?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join developers who are already building forms faster with FormCarve.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button size="lg" variant="secondary" asChild className="bg-white text-gray-900 hover:bg-gray-100">
                            <Link href="/builder">
                                <Play className="w-5 h-5 mr-2" />
                                Try the Builder
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="border-white text-white bg-white text-gray-900">
                            <Link href="https://www.npmjs.com/package/@jonesstack/react-form-engine">
                                <Download className="w-5 h-5 mr-2" />
                                Install Package
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">FC</span>
                                </div>
                                <span className="font-bold text-xl">FormCarve</span>
                            </div>
                            <p className="text-gray-400">
                                Developer-first form builder and renderer for React applications.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/builder" className="hover:text-white transition-colors">Builder</Link></li>
                                <li><Link href="https://www.npmjs.com/package/@jonesstack/react-form-engine" className="hover:text-white transition-colors">Package</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Community</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="https://github.com/allenarduino/formcarve" className="hover:text-white transition-colors">GitHub</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Discord</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Twitter</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Resources</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Examples</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
                            </ul>
                        </div>
                    </div>

                    <Separator className="my-8 bg-gray-800" />

                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © 2024 FormCarve. Built with ❤️ by Allen Jones for the React community.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}







