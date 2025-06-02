type teamProps = {
    name: string;
    position: string;
    url:string;
}

function Member({ name, position,url }: teamProps) {
    return (
        <div className="w-64 text-center">
            <img src={url} alt={name} className="rounded-full w-32 h-32 mx-auto mb-2" />
            <h3 className="text-xl font-medium">{name}</h3>
            <p className="text-sm text-gray-600">{position}</p>
        </div>
    )
}

export default Member