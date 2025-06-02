import Member from "./Member";
import castrol from "../../assets/castrol.jpeg";
import kasongo from "../../assets/kasongo.jpeg";
import jane from "../../assets/jane.jpeg"

function TeamMembers() {
    return (
        <section className="text-center">
            <h2 className="text-3xl font-semibold mb-6">Meet Our Team</h2>
            <div className="flex flex-wrap justify-center gap-8">
                <Member name={"Castrol Banda"} position={"Director"} url={castrol} />
                <Member name={"Jane Shayou"} position={"Developer"} url={jane} />
                <Member name={"John Kasongo"} position={"Designer"} url={kasongo} />
            </div>
        </section>
    )
}

export default TeamMembers