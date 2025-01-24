import React from "react";
import "../../styles/home.css";
import porteria from "../../img/porteria.webp"
import kitchenette from "../../img/kitchenette.webp"




export const Benefits = () => {
    return (
        <>
            <div className="benefits text-light ">
                <div className="d-flex align-items-center py-5 mx-5">

                    <div className="d-flex justify-content-center align-items-center ">
                        <h3 className="benefit ms-2">5</h3>

                        <div>
                            <h4 className="benefit-name my-0">Consultorios</h4>
                            <p className="benefit-description my-0">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
                        </div>
                    </div>


                    <div className="d-flex justify-content-center align-items-center ">
                        <img className="porteria mx-1" src={porteria} />

                        <div>
                            <h4 className="benefit-name my-0">Portería</h4>
                            <p className="benefit-description my-0">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center align-items-center  ">

                        <h4 className="benefit-name my-0 me-1"><i className="fa-solid fa-wifi fa-2xl" ></i></h4>
                        <div>
                            <h4 className="benefit-name my-0">Acceso a Wifi</h4>
                            <p className="benefit-description my-0">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
                        </div>
                    </div>


                    <div className="d-flex justify-content-center align-items-center ">

                        <img className="kitchenette mx-1" src={kitchenette} />
                        <div>
                            <h4 className="benefit-name my-0">Acceso a Wifi</h4>
                            <p className="benefit-description my-0">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
                        </div>
                    </div>



                </div>




            </div>
        </>
    )
}