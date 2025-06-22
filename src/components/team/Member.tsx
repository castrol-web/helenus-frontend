type teamProps = {
    position: string;
    url:string;
}

function Member({ position,url }: teamProps) {
    return (
        <div className="w-58 text-center mb-2">
            <img src={url} alt={url} className="rounded-full w-30 h-30 mx-auto mb-2 hover:border" />
            <p className="text-sm text-gray-400">{position}</p>
        </div>
    )
}

export default Member