import React, {useState,useRef} from "react";
import styles from "../Body/Body.module.css";
import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";
import Resume1 from "../Resume1/Resume1";
import { ArrowDown } from "react-feather";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";

const ResumeDetails=()=>{
    const sections={
        basicInfo:"Basic Info",
        career:"Career Objective",
        education:"Education",
        workExp:"Work Experience",
        skills:"Skills",
        project:"Projects",
    }
    const [resumeInformation,setResumeInformation]=useState({
        [sections.basicInfo]:{
            id: sections.basicInfo,
            secTitle: sections.basicInfo,
            detail:{},
        },
        [sections.career]:{
            id: sections.career,
            secTitle: sections.career,
            detail:"",
        },
        [sections.education]:{
            id: sections.education,
            secTitle: sections.education,
            details:[],
        },
        [sections.skills]:{
            id: sections.skills,
            secTitle: sections.skills,
            details:[],
        },
        [sections.workExp]:{
            id: sections.workExp,
            secTitle: sections.workExp,
            details:[],
        },
        [sections.project]:{
            id: sections.project,
            secTitle: sections.project,
            details:[],
        },
    });

    const { id } = useParams();
    const resuemRef=useRef();

    let selectedComponent;
    switch (id) {
        case '1':
        selectedComponent = <Resume ref={resuemRef} information={resumeInformation} sections={sections} />;
        break;
        case '2':
        selectedComponent = <Resume1 ref={resuemRef} information={resumeInformation} sections={sections} />;
        break;
        default:
        selectedComponent = <div>Component not found</div>;
    }

    return (
        <div className={styles.container}>
            <p className={styles.heading}>RESUME BUILDER</p>
            <div className={styles.download}>
                <p><span>"</span>Fill all necessary details before <span>downloading!"</span></p>
                <ReactToPrint
                    trigger={() => {
                        return (<button>Download <ArrowDown /></button>);
                    }}
                    content={() => resuemRef.current}
                />   
            </div>
            <div className={styles.main}>
                <Editor 
                    sections={sections} 
                    information={resumeInformation} 
                    setInformation={setResumeInformation}
                />
                {selectedComponent}
            </div>
            
        </div>
      );
}

export default ResumeDetails;