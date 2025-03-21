export const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="rounded-lg border border-[#d4c9bd] bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 inline-flex rounded-full bg-[#f8f3e9] p-3 text-[#7d5a50]">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-[#7d5a50]">{title}</h3>
      <p className="text-[#a98467]">{description}</p>
    </div>
  )
}

