import Member from "./Member";
import Alex from "../../assets/Alex.jpeg";
import muthoni from "../../assets/muthoni.jpeg";
import Gipson from "../../assets/Gipson.jpeg"
import sofi from "../../assets/sofi.jpeg"

function TeamMembers() {
    return (
        <section className="text-center">
            <h2 className="text-3xl font-semibold mb-6">Meet Our Team</h2>
            <div className="flex flex-wrap justify-center gap-8">
                <Member position={"Director"} url={Alex} />
                <Member position={"consultants"} url={Gipson} />
                <Member position={"Designer"} url={muthoni} />
                <Member position={"Care giving"} url={sofi} />
            </div>
        </section>
    )
}

export default TeamMembers