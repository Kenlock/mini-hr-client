import React from 'react';
import styles from './InfoCard.module.css';
const InfoCard = ({ icon, heading, cardInfo, btn }) => {
  return (
    <div className={styles.wrapper}>
      {icon}
      <h4 className={styles.heading}>{heading}</h4>
      {cardInfo && (
        <ul>
          {cardInfo.map((info) => (
            <li>
              <span>{info}</span>
            </li>
          ))}
        </ul>
      )}
      {btn}
    </div>
  );
};

export default InfoCard;
