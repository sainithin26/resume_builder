import React, { useEffect, useState } from "react";
import styles from "./Editor.module.css";
import Input from "../InputArea/Input";
import { X } from "react-feather";
function Editor(props){
    const sections=props.sections;
    const information=props.information;

    const [activeSectionKey,setActiveKey]=useState(Object.keys(sections)[0]);

    const [activeInformation,setActiveInformation]=useState(
        information[sections[Object.keys(sections)[0]]]
    );
    
    const [sectionTitle,setSectionTitle]=useState(Object.keys(sections)[0]);

    const [values,setValues]=useState({
        name: activeInformation?.detail?.name || "",
        title: activeInformation?.detail?.title || "",
        github: activeInformation?.detail?.github || "",
        linkedin: activeInformation?.detail?.linkedin || "",
        phone: activeInformation?.detail?.phone || "",
        email:activeInformation?.detail?.email || "",
    })

    const [activeDetailIndex,setActiveDetailIndex]=useState(0);

    const handlePointUpdate=(value,index)=>{
        const tempValues={...values};
        if(!Array.isArray(tempValues.points)) 
            tempValues.points=[]
        tempValues.points[index]=value;
        setValues(tempValues);
    }

    const handleNew=()=>{
        const details=activeInformation?.details;
        if(!details) return;
        const lastDetail=details?.slice(-1)[0];
        if(!Object.keys(lastDetail).length) return;
        details?.push({});
        props.setInformation((prev)=>({
            ...prev,
            [sections[activeSectionKey]]:{
            ...information[sections[activeSectionKey]],
            details:details,
            },
        }));
        setActiveDetailIndex(details?.length-1);
    };

    const handleDelete=(index)=>{
        const details=activeInformation?.details?[...activeInformation?.details]:"";
        if(!details) return;
        details.splice(index,1);
        props.setInformation(prev=>({
            ...prev,
            [sections[activeSectionKey]]:{
            ...information[sections[activeSectionKey]],
            details:details,
            },
        }));
        setActiveDetailIndex(details.length-1);
    }
    const basicInfoBody=(
        <div className={styles.detail}>
            <div className={styles.row}>
                <Input label="Name" placeholder="Enter your name" value={values.name} 
                        onChange={(event)=>{
                            setValues(prevs=>({...prevs,name:event.target.value}))
                        }} />
                <Input label="Title" placeholder="Enter title Eg. Frontend Developer" 
                        value={values.title}
                        onChange={(event)=>{
                            setValues(prevs=>({...prevs,title:event.target.value}))
                        }} /> 
            </div>
            <div className={styles.row}>
                <Input label="Github Link" placeholder="Enter your github link" value={values.github} 
                        onChange={(event)=>{
                            setValues(prevs=>({...prevs,github:event.target.value}))
                        }}/>
                <Input label="Linkedin Link" placeholder="Enter your linkedin link" value={values.linkedin} 
                        onChange={(event)=>{
                            setValues(prevs=>({...prevs,linkedin:event.target.value}))
                        }}/> 
            </div>
            <div className={styles.row}>
                <Input label="phone" type="number" placeholder="Enter your phone number" 
                        value={values.phone}
                        onChange={(event)=>{
                            setValues(prevs=>({...prevs,phone:event.target.value}))
                        }} />
                <Input label="email" type="email" placeholder="Enter your email" value={values.email} 
                        onChange={(event)=>{
                            setValues(prevs=>({...prevs,email:event.target.value}))
                        }}/> 
            </div>
        </div>
    );
    const careerBody=(
        <div className={styles.detail}>
            <Input label="Career Objective" placeholder="Enter your career objective" value={values.objective}
                    onChange={(event)=>{
                        setValues(prevs=>({...prevs,objective:event.target.value}))
                }}/>
        </div>
    )
    const educationBody=(
        <div className={styles.detail}>
            <div className={styles.row}>
                <Input label="Course" placeholder="Enter degree Eg. CSE BTech" value={values.course}
                        onChange={(event)=>{
                            setValues(prevs=>({...prevs,course:event.target.value}))
                        }}/> 
            </div>
            <div className={styles.row}>
                <Input label="College/School" placeholder="Enter your college/school name" 
                    value={values.college}
                    onChange={(event)=>{
                        setValues(prevs=>({...prevs,college:event.target.value}))
                    }}/> 
                    <Input label="Percentage" placeholder="Enter your percentage" 
                    value={values.percentage}
                    type="number"
                    onChange={(event)=>{
                        setValues(prevs=>({...prevs,percentage:event.target.value}))
                    }}/> 
            </div>
            <div className={styles.row}>
                <Input label="Start Date" type="date" placeholder="Enter start date of education" 
                        value={values.startDate}
                        onChange={(event)=>{
                            setValues(prevs=>({...prevs,startDate:event.target.value}))
                        }}/>
                <Input label="End Date" type="date" placeholder="Enter end date of education" 
                        value={values.endDate}
                        onChange={(event)=>{
                            setValues(prevs=>({...prevs,endDate:event.target.value}))
                        }}/> 
            </div>
        </div>
    );

    const skillsBody=(
        <div className={styles.detail}>
            <div className={styles.row}>
                <Input label="Title"  placeholder="Ex: Frontend, Programming languages" value={values.title}
                        onChange={(event)=>{
                            setValues(prevs=>({...prevs,title:event.target.value}))
                        }}/>
            </div>
            <div className={styles.row}>
                <Input label="Skills"  placeholder="Enter your skills with space" value={values.skills}
                        onChange={(event)=>{
                            setValues(prevs=>({...prevs,skills:event.target.value}))
                        }}/>
            </div>
        </div>
    );

    const workExpBody=(
        <div className={styles.detail}>
            <div className={styles.row}>
                <Input label="Title" placeholder="Eg: Frontend Developer" value={values.title}
                        onChange={(event)=>{
                            setValues(prevs=>({...prevs,title:event.target.value}))
                        }} />
                <Input label="Company Name" placeholder="Eg: amazon" value={values.companyName}
                        onChange={(event)=>{
                            setValues(prevs=>({...prevs,companyName:event.target.value}))
                        }}/> 
            </div>
            <div className={styles.row}>
                <Input label="Start Date" type="date" placeholder="Enter Start date" 
                    value={values.startDate}
                    onChange={(event)=>{
                        setValues(prevs=>({...prevs,startDate:event.target.value}))
                    }}/>
                <Input label="End Date" placeholder="Enter End date ex:present or 10/05/2022" 
                        value={values.endDate}
                        onChange={(event)=>{
                            setValues(prevs=>({...prevs,endDate:event.target.value}))
                        }}/> 
            </div>
            <div className={styles.column}>
                <label>Enter work description</label>
                <Input placeholder="Enter your work experience" value={values.points ? values.points[0]:""}
                        onChange={(event)=>handlePointUpdate(event.target.value,0)} />
            </div>
        </div>
    );

    const projectBody=(
        <div className={styles.detail}>
            <div className={styles.row}>
                <Input label="Title" placeholder="Enter your project title" value={values.title}
                        onChange={(event)=>{
                            setValues(prevs=>({...prevs,title:event.target.value}))
                        }} />
                <Input label="Deployed Link" placeholder="Enter deployed link of project" 
                        value={values.deployed}
                        onChange={(event)=>{
                            setValues(prevs=>({...prevs,deployed:event.target.value}))
                        }}/>
            </div>
            <div className={styles.column}>
                <label>Enter project description</label>
                <Input placeholder="Enter about your project" value={values.points ? values.points[0]:""}
                        onChange={(event)=>handlePointUpdate(event.target.value,0)}/>
            </div>
        </div>
    );
    
    const generateBody=()=>{
        switch(sections[activeSectionKey]){
            case sections.basicInfo:
                return basicInfoBody;

            case sections.career:
                return careerBody;

            case sections.education:
                return educationBody;

            case sections.skills:
                return skillsBody;

            case sections.workExp:
                return workExpBody;

            case sections.project:
                return projectBody;

            default: return null;
        }
    }

    const handleSubmission=()=>{
        switch(sections[activeSectionKey]){
            case sections.basicInfo:{
                const emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                const isValid = emailRegex.test(values.email);
                var tempDetail={};
                if(isValid && values.phone.length===10){
                    tempDetail={
                        name:values.name,
                        title:values.title,
                        github:values.github,
                        linkedin:values.linkedin,
                        phone:values.phone,
                        email:values.email,
                    }
                }else if(values.phone.length===10){
                    tempDetail={
                        name:values.name,
                        title:values.title,
                        github:values.github,
                        linkedin:values.linkedin,
                        phone:values.phone,
                    }
                }else if(isValid){
                    tempDetail={
                        name:values.name,
                        title:values.title,
                        github:values.github,
                        linkedin:values.linkedin,
                        email:values.email,
                    }
                }else{
                    tempDetail={
                        name:values.name,
                        title:values.title,
                        github:values.github,
                        linkedin:values.linkedin,
                    }
                }
                props.setInformation(prev=>({
                    ...prev,
                    [sections.basicInfo]:{
                        ...prev[sections.basicInfo],
                        detail:tempDetail,
                        sectionTitle,
                    }
                }))
                break;
            }
            case sections.career:{
                const tempDetail=values.objective;
                
                props.setInformation(prev=>({
                    ...prev,
                    [sections.career]:{
                        ...prev[sections.career],
                        detail:tempDetail,
                        sectionTitle,
                    }
                }))
                break;
            } 
            case sections.education:{
                var tempDetail={}
                if(values.percentage.length<=4){
                    tempDetail={
                        course:values.course,
                        college:values.college,
                        startDate:values.startDate,
                        endDate:values.endDate,
                        percentage:values.percentage,
                    }
                }else{
                    alert("Enter valid percentage");
                    tempDetail={
                        course:values.course,
                        college:values.college,
                        startDate:values.startDate,
                        endDate:values.endDate,
                    }
                }
                const tempDetails=[...information[sections.education]?.details];
                tempDetails[activeDetailIndex]=tempDetail;

                props.setInformation(prev=>({
                    ...prev,
                    [sections.education]:{
                        ...prev[sections.education],
                        details:tempDetails,
                        sectionTitle,
                    }
                }))
                break;
            } 
            case sections.skills:{
                const tempDetail={
                    title:values.title,
                    skills:values.skills,
                }
                const tempDetails=[...information[sections.skills]?.details];
                tempDetails[activeDetailIndex]=tempDetail;
                
                props.setInformation(prev=>({
                    ...prev,
                    [sections.skills]:{
                        ...prev[sections.skills],
                        details:tempDetails,
                        sectionTitle,
                    }
                }))
                break;
            } 
            case sections.workExp:{
                const tempDetail={
                    title:values.title,
                    companyName:values.companyName,
                    startDate:values.startDate,
                    endDate:values.endDate,
                    points:values.points,
                }
                const tempDetails=[...information[sections.workExp]?.details];
                tempDetails[activeDetailIndex]=tempDetail;
                
                props.setInformation(prev=>({
                    ...prev,
                    [sections.workExp]:{
                        ...prev[sections.workExp],
                        details:tempDetails,
                        sectionTitle,
                    }
                }))
                break;
            } 
            case sections.project:{
                const tempDetail={
                    title:values.title,
                    deployed:values.deployed,
                    points:values.points,
                }
                const tempDetails=[...information[sections.project]?.details];
                tempDetails[activeDetailIndex]=tempDetail;
                
                props.setInformation(prev=>({
                    ...prev,
                    [sections.project]:{
                        ...prev[sections.project],
                        details:tempDetails,
                        sectionTitle,
                    }
                }))
                break;
            }         
        }
    }

    useEffect(()=>{
        const activeInfo=information[sections[activeSectionKey]];
        setActiveInformation(activeInfo);
        setSectionTitle(sections[activeSectionKey]);
        setValues({
            course: activeInfo?.details ?activeInfo?.details[0]?.course || "":"",
            college: activeInfo?.details ?activeInfo?.details[0]?.college || "":"",
            startDate: activeInfo?.details ?activeInfo?.details[0]?.startDate || "":"",
            endDate: activeInfo?.details ?activeInfo?.details[0]?.endDate || "":"",
            skills: activeInfo?.details ?activeInfo?.details[0]?.skills || "":"",
            email:activeInfo?.detail?.email || "",
            name: activeInfo?.detail?.name || "",
            github: activeInfo?.details ?activeInfo?.details[0]?.github || "":activeInfo?.detail?.github || "",
            linkedin: activeInfo?.detail?.linkedin || "",
            phone: activeInfo?.detail?.phone || "",
            objective: activeInfo?.detail || "",
            title: activeInfo?.details ?activeInfo?.details[0]?.title || "":activeInfo?.detail?.title || "",
            companyName: activeInfo?.details ?activeInfo?.details[0]?.companyName || "":"",
            points: activeInfo?.details ?
                    activeInfo?.details[0]?.points? 
                    [...activeInfo?.details[0]?.points]|| "":""
                    :activeInfo?.points ?
                    [...activeInfo?.points]:"",
            deployed: activeInfo?.details ?activeInfo?.details[0]?.deployed || "":"",
            percentage: activeInfo?.details ?activeInfo?.details[0]?.percentage || "":"",
        });
        setActiveDetailIndex(0);
    },[activeSectionKey]);

    useEffect(()=>{
        setActiveInformation(information[sections[activeSectionKey]]);
    },[information]);

    useEffect(()=>{
        const details=activeInformation?.details;
        if(!details) return;
        const activeInfo=information[sections[activeSectionKey]];

        setValues({
            title:activeInfo.details[activeDetailIndex]?.title || "",
            skills:activeInfo.details[activeDetailIndex]?.skills||"",
            companyName:activeInfo.details[activeDetailIndex]?.companyName||"",
            startDate:activeInfo.details[activeDetailIndex]?.startDate||"",
            endDate:activeInfo.details[activeDetailIndex]?.endDate||"",
            points:activeInfo.details[activeDetailIndex]?.points||"",
            deployed:activeInfo.details[activeDetailIndex]?.deployed||"",
            github:activeInfo.details[activeDetailIndex]?.github||"",
            course:activeInfo.details[activeDetailIndex]?.course||"",
            college:activeInfo.details[activeDetailIndex]?.college||"",
            percentage:activeInfo.details[activeDetailIndex]?.percentage||"",
        });
    },[activeDetailIndex]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {Object.keys(sections)?.map((key)=>(
                    <div className={`${styles.section} ${activeSectionKey===key?styles.active:""}`} 
                        key={key} 
                        onClick={()=>setActiveKey(key)}
                        >
                        {sections[key]}
                    </div>
                ))}
            </div>
            <div className={styles.body}>
                <Input 
                    label="Title" 
                    value={sectionTitle} 
                    placeholder="Enter section title" 
                    onChange={(event)=>{
                        setSectionTitle(event.target.value);
                    }}
                />
                <div className={styles.chips}>
                    {
                        activeInformation?.details ?
                        activeInformation?.details?.map((item,index)=>(
                                <div className={` ${styles.chip} ${activeDetailIndex===index? styles.active:""}`} 
                                        key={item.title+index}
                                        onClick={()=>{
                                            setActiveDetailIndex(index);
                                        }}>
                                <p>{sections[activeSectionKey]} {index+1}</p>
                                <X onClick={(event)=>{
                                    event.stopPropagation();
                                    handleDelete(index);
                                }} />
                            </div>
                        )):""
                    }
                    {
                        activeInformation?.details && activeInformation?.details?.length>0 ?
                       (<div className={styles.new} onClick={handleNew}>+New</div>):
                        ("")
                    }
                </div>
                {generateBody()}
                <button onClick={handleSubmission}>Save</button>
            </div>
        </div>
    );
}
export default Editor;