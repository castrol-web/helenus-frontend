import StatusCard from "../../components/stats/statistics/StatusCard"
import { GiMiningHelmet } from "react-icons/gi";
import { LiaCcVisa } from "react-icons/lia";

function Dashboard() {
    return (
        <div className="flex items-center justify-center gap-8">
            <StatusCard title={"Available jobs"} value={"20"} icon={GiMiningHelmet} trend={"10%"} trendDirection={"up"} />
            <StatusCard title={"Available Visas"} value={"40"} icon={LiaCcVisa } trend={"57%"} trendDirection={"down"} />
        </div>
    )
}

export default Dashboard