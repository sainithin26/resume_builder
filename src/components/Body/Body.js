import React, {useRef, useState} from "react";
import styles from "./Body.module.css";
import { ArrowDown } from "react-feather";
import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";
import Resume1 from "../Resume1/Resume1";
import ReactToPrint from "react-to-print";

function Body(){
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

    const [selectedIndex, setSelectedIndex] = useState();
    const [selectedImage, setSelectedImage] = useState(null);

    const imageUrls = [
        require("../../assets/template2.jpg"),
        require("../../assets/template1.png"),
      ];

    const resuemRef=useRef();

    const handleTemplate= (index,image)=>{
        setSelectedIndex(index);
        setSelectedImage(image);
    }

    const renderSelectedComponent = () => {
        if (selectedImage === 'Image 1') {
          return <Resume ref={resuemRef} information={resumeInformation} sections={sections} />;
        } else if (selectedImage === 'Image 2') {
          return <Resume1 ref={resuemRef} information={resumeInformation} sections={sections} />;
        }
        return null;
    };

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
            <div className={styles.resume}>
                <div className={styles.resumeTemplate}>
                    <p className={styles.subheading}>Resume Templates</p>
                    <div className={styles.templates}>
                        {imageUrls.map((imageUrl, index) => (
                            <img
                                key={index}
                                src={imageUrl}
                                alt={`Image ${index + 1}`}
                                className={`${styles.images} ${selectedIndex===index ? styles.borderImg:""}`}
                                onClick={() => handleTemplate(index,`Image ${index + 1}`)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            <div className={styles.main}>
                <Editor 
                    sections={sections} 
                    information={resumeInformation} 
                    setInformation={setResumeInformation}
                />
            </div>

            {renderSelectedComponent()}
            
        </div>
    );
}
export default Body;