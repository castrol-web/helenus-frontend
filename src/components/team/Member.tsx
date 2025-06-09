type teamProps = {
    position: string;
    url:string;
}

function Member({ position,url }: teamProps) {
    return (
        <div className="w-64 text-center">
            <img src={url} alt={url} className="rounded-full w-32 h-32 mx-auto mb-2" />
            <p className="text-sm text-gray-600">{position}</p>
        </div>
    )
}

export default Member