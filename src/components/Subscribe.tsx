import '../style/Subscribe.css';
import Container from "./ui/Container";
function Subscribe() {


    return (
        <Container>
            <div className="w-full px-5 pt-10 pb-10 rounded-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4 justify-center items-center">
                    <div className="text-center rounded-2xl shadow  dynamic-bg-1">
                        <h3 className="text-6xl text-[#2cb1ec] font-bold p-2">Saddle Personal Fitting</h3>
                        <p className="font-medium p-2 text-2xl mt-2 text-[#0B1221]">
                            Individual saddle fitting according to your height and weight.
                        </p>
                    </div>

                    <div className="text-center rounded-2xl shadow  dynamic-bg-2">
                        <h3 className="text-6xl text-[#2cb1ec] font-bold p-2">Spare Parts Exchange</h3>
                        <p className="font-medium text-2xl p-2 mt-2 text-[#0B1221]">
                            Individual saddle fitting according to your height and weight.
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Subscribe;
