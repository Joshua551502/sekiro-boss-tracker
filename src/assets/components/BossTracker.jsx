import React, { useState, useEffect } from "react";
import "./BossTracker.css";
import GyoubuOniwa from "../../assets/images/gyoubu_oniwa.jpg";
import LadyButterfly from "../../assets/images/lady_butterfly.jpg";
import GenichiroAshina from "../../assets/images/genichiro_ashina.jpg";
import FoldingScreenMonkeys from "../../assets/images/folding_screen_monkeys.jpg";
import GuardianApe from "../../assets/images/guardian_ape.jpg";
import HeadlessApe from "../../assets/images/headless_ape.jpg";
import CorruptedMonk from "../../assets/images/corrupted_monk.jpg";
import IsshinAshina from "../../assets/images/isshin_ashina.jpg";
import GreatShinobiOwl from "../../assets/images/great_shinobi_owl.jpg";
import TrueCorruptedMonk from "../../assets/images/true_corrupted_monk.jpg";
import DivineDragon from "../../assets/images/divine_dragon.jpg";
import OwlFather from "../../assets/images/owl_father.jpg";
import DemonOfHatred from "../../assets/images/demon_of_hatred.jpg";
import IsshinTheSwordSaint from "../../assets/images/isshin_the_sword_saint.jpg";

const bosses = [
  { name: "Gyoubu Oniwa", image: GyoubuOniwa, emoji: "⚔️" },
  { name: "Lady Butterfly", image: LadyButterfly, emoji: "🦋" },
  { name: "Genichiro Ashina", image: GenichiroAshina, emoji: "🗡️" },
  { name: "Folding Screen Monkeys", image: FoldingScreenMonkeys, emoji: "🐒" },
  { name: "Guardian Ape", image: GuardianApe, emoji: "🦧" },
  { name: "Headless Ape", image: HeadlessApe, emoji: "🐵" },
  { name: "Corrupted Monk", image: CorruptedMonk, emoji: "🧘" },
  { name: "Isshin Ashina", image: IsshinAshina, emoji: "🔥" },
  { name: "Great Shinobi Owl", image: GreatShinobiOwl, emoji: "🦉" },
  { name: "True Corrupted Monk", image: TrueCorruptedMonk, emoji: "🧘" },
  { name: "Divine Dragon", image: DivineDragon, emoji: "🐉" },
  { name: "Owl (Father)", image: OwlFather, emoji: "🦉" },
  { name: "Demon of Hatred", image: DemonOfHatred, emoji: "😈" },
  { name: "Isshin, The Sword Saint", image: IsshinTheSwordSaint, emoji: "⚔️" },
];

const BossTracker = () => {
  const [deathCounts, setDeathCounts] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoss, setSelectedBoss] = useState(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isGlobalResetModalOpen, setIsGlobalResetModalOpen] = useState(false);

  useEffect(() => {
    const storedCounts = JSON.parse(localStorage.getItem("deathCounts")) || {};
    setDeathCounts(storedCounts);
  }, []);

  useEffect(() => {
    localStorage.setItem("deathCounts", JSON.stringify(deathCounts));
  }, [deathCounts]);

  useEffect(() => {
    if (isModalOpen || isResetModalOpen || isGlobalResetModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, isResetModalOpen, isGlobalResetModalOpen]);

  const adjustCount = (boss, amount) => {
    setDeathCounts((prevCounts) => ({
      ...prevCounts,
      [boss]: (prevCounts[boss] || 0) + amount,
    }));
  };

  const resetCount = (boss) => {
    setDeathCounts((prevCounts) => ({
      ...prevCounts,
      [boss]: 0,
    }));
  };

  const resetAllCounts = () => {
    const resetCounts = {};
    bosses.forEach((boss) => {
      resetCounts[boss.name] = 0;
    });
    setDeathCounts(resetCounts);
    setIsGlobalResetModalOpen(false);
  };

  const handleCountChange = (boss, value) => {
    const newValue = parseInt(value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      setDeathCounts((prevCounts) => ({
        ...prevCounts,
        [boss]: newValue,
      }));
    }
  };

  const openModal = (boss) => {
    setSelectedBoss(boss);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBoss(null);
  };

  const openResetModal = () => {
    setIsResetModalOpen(true);
  };

  const closeResetModal = () => {
    setIsResetModalOpen(false);
  };

  const handleReset = () => {
    if (selectedBoss) {
      resetCount(selectedBoss.name);
    }
    closeResetModal();
    closeModal();
  };

  const openGlobalResetModal = () => {
    setIsGlobalResetModalOpen(true);
  };

  const closeGlobalResetModal = () => {
    setIsGlobalResetModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (event.target.closest(".modal-content")) {
      return;
    }
    closeModal();
    closeResetModal();
    closeGlobalResetModal();
  };

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
      if (isModalOpen && selectedBoss) {
        adjustCount(selectedBoss.name, 1);
      }
    } else if (event.key === "d") {
      event.preventDefault();
      if (isModalOpen && selectedBoss) {
        adjustCount(selectedBoss.name, -1);
      }
    }
  };

  const totalDeaths = Object.values(deathCounts).reduce(
    (acc, count) => acc + count,
    0
  );

  return (
    <div className="container">
      <h1 className="title">Sekiro Boss Tracker</h1>
      <ul className="boss-list">
        {bosses.map((boss) => (
          <li
            key={boss.name}
            className="boss-item"
            onClick={() => openModal(boss)}
          >
            <span className="boss-name">
              <img src={boss.image} alt={boss.name} className="boss-image" />
              {boss.name} {boss.emoji}
            </span>
            <div className="button-group">
              <button
                className="button"
                onClick={(e) => {
                  e.stopPropagation();
                  adjustCount(boss.name, -1);
                }}
                disabled={deathCounts[boss.name] === 0}
              >
                -
              </button>
              <input
                className="count-input"
                type="number"
                value={deathCounts[boss.name] || 0}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  handleCountChange(boss.name, e.target.value)
                }
              />
              <button
                className="button"
                onClick={(e) => {
                  e.stopPropagation();
                  adjustCount(boss.name, 1);
                }}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-deaths">TOTAL DEATHS: {totalDeaths}</div>
      <button className="reset-button" onClick={openGlobalResetModal}>
        RESET ALL
      </button>

      {isModalOpen && selectedBoss && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedBoss.name}</h2>
            <img
              src={selectedBoss.image}
              alt={selectedBoss.name}
              className="modal-boss-image"
            />
            <div className="button-group">
              <button
                className="button"
                onClick={() => adjustCount(selectedBoss.name, -1)}
                disabled={deathCounts[selectedBoss.name] === 0}
              >
                -
              </button>
              <input
                className="count-input"
                type="number"
                value={deathCounts[selectedBoss.name] || 0}
                onChange={(e) =>
                  handleCountChange(selectedBoss.name, e.target.value)
                }
              />
              <button
                className="button"
                onClick={() => adjustCount(selectedBoss.name, 1)}
              >
                +
              </button>
            </div>
            <p className="description-text">
              Press <strong>Space</strong> to add one, <strong>D</strong> to go
              back one.
            </p>
            <button className="reset-button-2" onClick={openResetModal}>
              RESET
            </button>
          </div>
        </div>
      )}

      {isResetModalOpen && (
        <div className="modal confirmation-modal">
          <div className="modal-content">
            <p>
              Are you sure you want to reset the death count for{" "}
              {selectedBoss.name}?
            </p>
            <button className="modal-button" onClick={handleReset}>
              Yes
            </button>
            <button className="modal-button" onClick={closeResetModal}>
              No
            </button>
          </div>
        </div>
      )}

      {isGlobalResetModalOpen && (
        <div className="modal confirmation-modal">
          <div className="modal-content">
            <p>
              Are you sure you want to reset the death counts for all bosses?
            </p>
            <button className="modal-button" onClick={resetAllCounts}>
              Yes
            </button>
            <button className="modal-button" onClick={closeGlobalResetModal}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BossTracker;
