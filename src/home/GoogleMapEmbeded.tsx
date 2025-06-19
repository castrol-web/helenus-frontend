const GoogleMapEmbeded = () => (
    <div className="w-full rounded-xl shadow-md overflow-hidden mt-10">
        <iframe
            title="helenus(Kenya Complex)"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8203295727326!2d36.81475817397769!3d-1.2815435987062684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d306f3f499%3A0xed8398c7478632cd!2sKenya%20House%20Complex!5e0!3m2!1sen!2stz!4v1750167889853!5m2!1sen!2stz" 
            className="border-0"
            width="100%"
            height="400"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
        </iframe>
    </div>
);

export default GoogleMapEmbeded;
