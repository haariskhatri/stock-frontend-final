import React from 'react'
import ReadMoreReact from 'read-more-react/dist/components/ReadMoreReact';
import ReadMore from './ReadMore';

const CompanyProfile = ({ description, name }) => {

    const text = "Reliance Power is an Indian power generation and utility company. It is a subsidiary of Reliance Group, a conglomerate led by Indian business tycoon Mukesh Ambani. Reliance Power was incorporated in 2007 and is headquartered in Mumbai, Maharashtra."

        + "The company focuses on the development, construction, and operation of power projects across India. It has a diverse portfolio that includes thermal, gas, and renewable energy projects. Reliance Power has undertaken several ambitious projects, including the Sasan Ultra Mega Power Project in Madhya Pradesh, which is one of the largest integrated power plants in the world."

        + "Reliance Power has also ventured into renewable energy sources such as solar and wind power. It has developed and operates solar power projects in Rajasthan and Maharashtra and has plans for further expansion in the renewable energy sector."

        + "The company has actively pursued partnerships and collaborations with international companies to leverage expertise and technology. Reliance Power has formed strategic alliances with companies like GE Energy, Shanghai Electric Group, and Toshiba Corporation, among others."

        + "Despite its ambitious projects and potential, Reliance Power faced challenges in recent years. It encountered delays and cost overruns in some of its projects, leading to financial strain. However, the company has been working on resolving these issues and exploring opportunities to enhance its operational efficiency and financial stability."
    return (
        <>
            <div className="company-profile">
                <div className="company-title titles">
                    {name}
                </div>

                <ReadMore text={description} />
            </div>
        </>
    )
}

export default CompanyProfile;