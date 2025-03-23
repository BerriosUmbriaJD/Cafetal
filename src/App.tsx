import { Coffee, Package, BarChart3, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "./components/app/FeatureCard"
import { NavLink } from "react-router"
import HeroImage from "/hero.jpg"

function App() {
  return (
   <main className="max-w-full min-h-screen bg-[#f8f3e9]">
    <header className="sticky top-0 z-10 border-b border-b-[#d4c9bd] bg-[#f8f3e9]/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Coffee className="mr-2 h-6 w-6 text-[#7d5a50]" />
          <span className="text-xl font-bold text-[#7d5a50]">Coffee Cafetal</span>
        </div>
        <nav className="hidden space-x-6 md:flex">
          <a href="#" className="text-[#7d5a50] font-semibold">Home</a>
          <a href="#" className="text-[#7d5a50] font-semibold">About</a>
          <a href="#" className="text-[#7d5a50] font-semibold">Contact</a>
        </nav>
        <div className="flex items-center space-x-4">
         <NavLink to="/login">
          <Button variant="ghost" className="text-[#7d5a50] hover:bg-[#7d5a50]/10 cursor-pointer">
              Iniciar Sesion
            </Button>
         </NavLink>
          <Button className="bg-[#7d5a50] text-white hover:bg-[#6c4a40] cursor-pointer">
            Registrarse
          </Button>
        </div>
      </div>
    </header>
    <section className="container mx-auto flex flex-col-reverse items-center px-4 py-12 md:flex-row md:py-24">
        <div className="mt-8 flex-1 space-y-6 md:mt-0 md:pr-12">
          <h1 className="text-4xl font-bold leading-tight text-[#7d5a50] md:text-5xl lg:text-5xl">
            El café que necesitas <br />
            <span className="text-[#a98467]">con sabor y comodidad.</span>
          </h1>
          <p className="max-w-md text-lg text-[#7d5a50]/80">
            Descubre la comodidad de manejar tu cafetería con facilidad y permitir a tus clientes deleitarse con el sabor de tus cafés con la dashboard intuitiva.
          </p>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button size="lg" className="bg-[#7d5a50] text-white hover:bg-[#6c4a40] cursor-pointer">
              Empieza ya
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-xl md:h-80 lg:h-96">
            <img
              src={HeroImage}
              alt="Coffee shop management dashboard"
              className="object-cover"
            />
          </div>
        </div>
    </section>
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#7d5a50] md:text-4xl">Todo lo que necesitas para tu cafetería.</h2>
          <p className="mt-4 text-[#a98467]">Nuestras herramientas te proveeran de lo esencial sin complicaciones.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Coffee />}
            title="Gestión de menú"
            description="Gestiona tus menús, precios y disponibilidad en tiempo real."
          />
          <FeatureCard
            icon={<Package />}
            title="Gestión de inventario"
            description="Gestiona tus ingredientes y suministros con alertas automatizadas."
          />
          <FeatureCard
            icon={<BarChart3 />}
            title="Análisis de calidad"
            description="Gestiona las plantaciones, tipos de café y todo lo que necesites."
          />
          <FeatureCard
            icon={<Users />}
            title="Gestión de clientes"
            description="Gestiona tus clientes con perfiles y programas de lealtad."
          />
        </div>
      </div>
    </section>
   </main>
  )
}

export default App
