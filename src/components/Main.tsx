import React from "react";
import Chart1 from "./Chart1";
import { FaPlus } from "react-icons/fa6";
import { BsCalendarDate } from "react-icons/bs";
import { MdArrowDropDownCircle } from "react-icons/md";
const Main = ({jsonData}:any) => {



    return (
        <div className='Main'>
            <div className="flex">
                <button className="button">Employee Movement Breakdown</button>
            </div>
            <div className="flex" style={{ margin: "20px 0" }}>
                <button className="button flex">
                    <BsCalendarDate className="marginIcon" />
                    2019
                </button>
                <button className="button flex">
                    <FaPlus className="marginIcon" />
                    Add a filer
                </button>
            </div>
            <div className="CHARTS flex">
                <div style={{ marginTop: "60vh",width:"5vw" }}>
                    <h1 className="heading1">4.85K</h1>
                    <p style={{ color: "gray", fontSize:"0.8rem" }}>Start Headcount</p>
                </div>
                <Chart1 />
                <div style={{ marginTop: "38vh",width:"5vw" }}>
                    <h1 className="heading1">5.23K</h1>
                    <p style={{ color: "gray", fontSize:"0.8rem" }}>End Headcount</p>
                </div>
            </div>
            <div className="flex main-foot">
                <div className="bars">
                    <div className="bar"></div>
                    <p>INCOMING</p>
                </div>
                <div className="bars">
                    <div className="bar"></div>
                    <p>OUTGOING</p>
                </div>
            </div>

        </div>
    )
}

export default Main
