
function ClientCard({ title, num }) {
    return (
        <div className='flex items-center justify-between min-w-32 p-6 gap-5 bg-yellow-200/15 rounded-xl text-base tracking-wider font-semibold '>
            <span className="text-sky-800 " > {title}</span>:
            <span className="text-amber-500 text-lg">{num}</span>
        </div>
    )
}

export default ClientCard
