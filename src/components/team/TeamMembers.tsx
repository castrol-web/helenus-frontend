import Member from "./Member";
import Alex from "../../assets/Alex.jpeg";
import muthoni from "../../assets/muthoni.jpeg";
import Gipson from "../../assets/Gipson.jpeg";
import sofi from "../../assets/sofi.jpeg";
import Alice from "../../assets/Alice.jpeg";
import Clinton from "../../assets/Clinton.jpeg";
import Josphat from "../../assets/Josphat.jpeg";
import Joan from "../../assets/Joan.jpeg";
import Simon from "../../assets/Simon.jpeg";
import Tracy from "../../assets/Tracy.jpeg";
import Team from "../../assets/Team.jpeg";

function TeamMembers() {
    return (
        <section className="text-center">
            {/* Hero banner */}
            <div className="relative h-[100vh] flex items-center justify-center">
                <img
                    src={Team}
                    alt="Helenus team"
                    className="absolute inset-0 w-full h-full object-contain mx-auto justify-center"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-white px-4">
                    <h2 className="text-4xl font-bold">Meet Our Team</h2>
                    <p className="mt-2 text-lg max-w-lg mx-auto">
                        A passionate team dedicated to guiding you through every step of your job and visa journey.
                    </p>
                </div>
            </div>


            {/* Team members */}
            <div className="py-12 lg:px-16 ">
                <div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto text-center">
                        <Member position="Manager" url={Alex} />
                        <Member position="Creative Director" url={Gipson} />
                        <Member position="Market Consultant" url={muthoni} />
                        <Member position="Market Consultant" url={Clinton} />
                        <Member position="Consultant" url={sofi} />
                        <Member position="Receptionist" url={Alice} />
                        <Member position="Marketer" url={Josphat} />
                        <Member position="Marketer" url={Joan} />
                        <Member position="Marketer" url={Simon} />
                        <Member position="Marketer" url={Tracy} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TeamMembers;
