import React, { useState, useEffect, forwardRef } from "react";
import styles from "./Resume1.module.css";

const Resume1=forwardRef((props,ref)=>{
    const information=props.information;
    const sections=props.sections;

    const [columns,setColumns]=useState([]);

    const info={
        workExp:information[sections.workExp],
        education:information[sections.education],
        project:information[sections.project],
        skills:information[sections.skills],
        basicInfo:information[sections.basicInfo],
        career:information[sections.career]
    };

    const getForamtedDate=(value)=>{
        if(!value) return "";
        const date=new Date(value);

        return `${date.getDate()}/${date.getMonth()+1}/
            ${date.getFullYear()}`;
    };

    const sectionDiv={
        [sections.career]:<div className={styles.career}>
            {info.career?.sectionTitle && (<div><p className={styles.sectionTitle}>{info.career.sectionTitle}</p><hr /></div>)}
            {info.career?.detail && (<p className={styles.obj}>{info.career?.detail}</p>)} 
    </div>,
        [sections.education]:<div className={styles.education}>
        {info.education?.sectionTitle && (<div><p className={styles.sectionTitle}>{info.education.sectionTitle}</p><hr /></div>)}
        {
            info.education?.details?.map(item=>(
                <div className={styles.univ}>
                    <div className={styles.edu}>
                        <div className={styles.educ}>
                            {item.college && (<p className={styles.college}>{item.college}</p>)}
                            <p className={styles.slash}>|</p>
                            {item.course && (<p className={styles.course}>{item.course}</p>)}
                        </div>
                        {item.percentage && (<p className={styles.percentage}>Percentage: {item.percentage}%</p>)}
                    </div>
                    { item.startDate && item.endDate ?<p className={styles.date}>
                        {getForamtedDate(item.startDate)} - {getForamtedDate(item.endDate)}</p>
                         :
                    ""}
                </div>
            ))
        }  
    </div>,
        [sections.workExp]:<div className={styles.workExp}>
        {info.workExp?.sectionTitle && (<div><p className={styles.sectionTitle}>{info.workExp.sectionTitle}</p><hr /></div>)}
        {
            info.workExp?.details?.map((item)=>(
                <div className={styles.workWidth}>
                    <div className={styles.content}>
                        <div className={styles.item}>
                            {item.title && (<p className={styles.company}>{item.title}</p>)}
                            <p className={styles.slash}>|</p>
                            {item.companyName && (<p className={styles.role}>{item.companyName}</p>)}
                        </div>
                        {
                            item.startDate && item.endDate ? (
                                <p className={styles.date}>{getForamtedDate(item.startDate)}-{item.endDate}</p>
                            ):""
                        }   
                    </div>
                    <p className={styles.point}>
                        {item.points}
                    </p>
                 </div>
            ))
        }  
    </div>,
        [sections.skills]:<div className={styles.skills}>
        {info.skills?.sectionTitle && (<div><p className={styles.sectionTitle}>{info.skills.sectionTitle}</p><hr /></div>)}
        {
            info.skills?.details?.map(item=>(
                <div className={styles.skill}>
                    {item.title && (<p className={styles.lan}>{item.title}</p>)}
                    {item.skills && (<p className={styles.skl}>{item.skills}</p>)}
                </div>
            ))
        }
    </div>,
        [sections.project]:<div className={styles.projects}>
        {info.project?.sectionTitle && (<div><p className={styles.sectionTitle}>{info.project.sectionTitle}</p><hr /></div>)}
        {
            info.project?.details?.map(item=>(
                <div className={styles.project}>
                    <div className={styles.content}>
                        <div className={styles.item}>
                            {item.title && (<p className={styles.company}>{item.title}</p>)}
                            <p className={styles.slash}>|</p>
                            {item.deployed && (<p className={styles.deploy}>{item.deployed}</p>)}
                        </div>
                    </div>
                    {item.points?.length>0 && (
                        <p className={styles.point}>
                            {item.points}
                        </p>
                    )}
                </div>
            ))
        }  
    </div>,
    }
    useEffect(()=>{
        setColumns([sections.career, sections.education, sections.workExp, sections.skills, sections.project]);
    },[]);

    return <div ref={ref}>
        <div className={styles.container}>
            <div className={styles.header}>
                {info.basicInfo?.detail?.name && (<p className={styles.heading}>{info.basicInfo?.detail?.name}</p>)}
                
                <div className={styles.links}>
                    {info.basicInfo?.detail?.email && (<div className={styles.link}>{info.basicInfo?.detail?.email}</div>)}
                    {info.basicInfo?.detail?.phone && (<div className={styles.link}>
                        <p className={styles.slash}>|</p>
                        {info.basicInfo?.detail?.phone}
                        </div>)}
                    {info.basicInfo?.detail?.linkedin && (<div className={styles.link}>
                        <p className={styles.slash}>|</p>
                        {info.basicInfo?.detail?.linkedin}
                        </div>)}
                </div>
            </div>
            {
                columns.map(item=>(sectionDiv[item]))
            }
        </div>
    </div>;
});

export default Resume1;