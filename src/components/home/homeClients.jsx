import React from "react";
import client1 from "../../assets/img/UNHHome-4.png";
import client2 from "../../assets/img/DraiHome.png";
import client3 from "../../assets/img/LegalzoomHOme-1.png";
import client4 from "../../assets/img/USAidHome-1.png";
import client5 from "../../assets/img/ElenaHome-3.png";
import client6 from "../../assets/img/motel6Home.png";
import client7 from "../../assets/img/AramcoHome-1.png";
import client8 from "../../assets/img/CadyHome-3.png";
import client9 from "../../assets/img/zyngaHome.png";
import client10 from "../../assets/img/FisherhouseHome.png";
const HomeClients = () => {
    return (
        <div>
            <section className="client-sec">
                <div className="container">
                    <ul className="list-inline client-ul">
                        <li>
                            <img src={client1} className="img-fluid" alt="" />
                        </li>
                        <li>
                            <img src={client2} className="img-fluid" alt="" />
                        </li>
                        <li>
                            <img src={client3} className="img-fluid" alt="" />
                        </li>
                        <li>
                            <img src={client4} className="img-fluid" alt="" />
                        </li>
                        <li>
                            <img src={client5} className="img-fluid" alt="" />
                        </li>
                        <li>
                            <img src={client6} className="img-fluid" alt="" />
                        </li>
                        <li>
                            <img src={client7} className="img-fluid" alt="" />
                        </li>
                        <li>
                            <img src={client8} className="img-fluid" alt="" />
                        </li>
                        <li>
                            <img src={client9} className="img-fluid" alt="" />
                        </li>
                        <li>
                            <img src={client10} className="img-fluid" alt="" />
                        </li>
                    </ul>
                    <div className="text-center">
                        <a href="#" className="view-btn"><span>View All Clients</span> <i className="bi bi-arrow-right-short"></i></a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeClients;
