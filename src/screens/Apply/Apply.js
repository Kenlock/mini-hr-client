import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from 'antd';
import axios from 'axios';
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  SlackOutlined,
} from '@ant-design/icons';
import styles from './Apply.module.css';

const ApplyForm = (props) => {
  useEffect(() => {
    async function makeAPICall() {
      const u = `${props?.match?.params?.id}`;
      const response = await axios.get(`http://localhost:3000/job/${u}`);
      const data = response.data.data;
      setCompanyName(data.company.companyName);
      setRole(data.role);
      setMinEquity(data.minEquity);
      setMaxEquity(data.maxEquity);
      setMinExperience(data.minExperience);
      setMaxExperience(data.maxExperience);
      setLocation(data.location);
      setJobType(data.type);
      setDescription(data.htmlDescription);
      setRequirements(data.htmlRequirements);
      setBenefits(data.htmlBenefits);
    }
    makeAPICall();
  }, []);
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [minEquity, setMinEquity] = useState('');
  const [maxEquity, setMaxEquity] = useState('');
  const [minExperience, setMinExperience] = useState('');
  const [maxExperience, setMaxExperience] = useState('');
  const [location, setLocation] = useState('');
  const [type, setJobType] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [benefits, setBenefits] = useState('');
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${role} Opening at ${companyName}`}</title>
      </Helmet>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.job_fresh}>NEW</div>
          <div style={{ margin: '10px 0px' }}>
            <span className={styles.job_role}>{role}</span>
            <span className={styles.job_type}>{type}</span>
          </div>
          <div className={styles.companyName}>{companyName}</div>
          <div className={styles.job_details}>
            <span>{`${minExperience}-${maxExperience} Years`}</span>
            <span>{location}</span>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Button>Apply Now</Button>
          </div>
        </div>
        <div className={styles.apply_now}>
          <div className={styles.apply_now_container}>
            {/*  */}
            <div>
              <div className={styles.apply_now_card}>
                <div className={styles.apply_now_card_title}>DESCRIPTION</div>
                <div
                  className={styles.apply_now_card_detail}
                  dangerouslySetInnerHTML={{ __html: description }}
                ></div>
              </div>
              <div className={styles.apply_now_card}>
                <div className={styles.apply_now_card_title}>REQUIREMENTS</div>
                <div
                  className={styles.apply_now_card_detail}
                  dangerouslySetInnerHTML={{ __html: requirements }}
                ></div>
              </div>
              <div className={styles.apply_now_card}>
                <div className={styles.apply_now_card_title}>BENEFITS</div>
                <div
                  className={styles.apply_now_card_detail}
                  dangerouslySetInnerHTML={{ __html: benefits }}
                ></div>
              </div>
            </div>
            {/*  */}
            <div className={styles.apply_now_job_detail}>
              <div>
                <div className={styles.apply_now_row}>
                  <div style={{ width: '81px' }}>Role</div>
                  <div style={{ width: '112px', wordWrap: 'break-word' }}>
                    {role}
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.apply_now_row}>
                  <div style={{ width: '81px' }}>Location</div>
                  <div style={{ width: '112px', wordWrap: 'break-word' }}>
                    {location}
                  </div>
                </div>
              </div>
              <div>
                <div LinkedinOutlinedclassName={styles.apply_now_row}>
                  <div style={{ width: '81px' }}>Work Exp.</div>
                  <div style={{ width: '112px', wordWrap: 'break-word' }}>
                    {`${minExperience}-${maxExperience} Years`}
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.apply_now_row}>
                  <div style={{ width: '81px' }}>Job Type</div>
                  <div style={{ width: '112px', wordWrap: 'break-word' }}>
                    {type}
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.apply_now_row}>
                  <div style={{ width: '81px' }}>Equity</div>
                  <div style={{ width: '112px', wordWrap: 'break-word' }}>
                    {`${minEquity ? minEquity : 0}% - ${
                      maxEquity ? maxEquity : 0
                    }%`}
                  </div>
                </div>
              </div>

              <Button style={{ height: '41px', marginTop: '20px' }}>
                Apply Now
              </Button>
              <div className={styles.apply_now_social}>
                Share with friends
                <div>
                  <FacebookOutlined
                    style={{ fontSize: '38px', marginRight: '10px' }}
                  />
                  <TwitterOutlined
                    style={{ fontSize: '38px', marginRight: '10px' }}
                  />
                  <LinkedinOutlined
                    style={{ fontSize: '38px', marginRight: '10px' }}
                  />
                  <SlackOutlined
                    style={{ fontSize: '38px', marginRight: '10px' }}
                  />
                </div>
              </div>
              <div style={{ marginTop: '18px' }}>
                <Button
                  onClick={() =>
                    window.open(`${props?.company?.website}`, '_blank')
                  }
                >
                  Company Website
                </Button>
                <Button>View All Openings</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ApplyForm;
