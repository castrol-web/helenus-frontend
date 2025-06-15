const GoogleMapEmbeded = () => (
    <div className="w-full rounded-xl shadow-md overflow-hidden mt-10">
        <iframe
            title="B&B google location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d208429.47958802982!2d-40.41786247514451!3d-20.342485092319873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb817d6512550f1%3A0x81081bfbe1120fbf!2sAcademia%20Helenus!5e0!3m2!1sen!2stz!4v1750004449272!5m2!1sen!2stz"
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
