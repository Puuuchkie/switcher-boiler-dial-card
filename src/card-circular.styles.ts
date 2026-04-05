import { css } from 'lit';

export default css`
  ha-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    user-select: none;
    -webkit-user-select: none;
  }

  .card-header {
    display: flex;
    align-items: center;
    padding: 10px 10px 2px 10px;
    cursor: pointer;
    flex-shrink: 0;
  }

  .icon-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 9px;
    transition: background-color 180ms ease-in-out;
  }

  .icon-container.on {
    background-color: rgba(245, 68, 54, 0.2);
  }

  .icon-container.off {
    background-color: rgba(158, 158, 158, 0.2);
  }

  .icon {
    --mdc-icon-size: 20px;
    line-height: 0;
  }

  .icon.on {
    color: #F54436;
  }

  .icon.off {
    color: var(--state-light-off-color, var(--state-inactive-color));
  }

  .header-label {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: 0;
  }

  .primary {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .secondary {
    font-size: 12px;
    font-weight: 400;
    color: var(--secondary-text-color, var(--primary-text-color));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .timer-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 14px;
    min-height: 0;
  }

  .timer-svg {
    width: 100%;
    max-width: 210px;
    touch-action: none;
    overflow: visible;
  }

  .timer-handle {
    cursor: grab;
    touch-action: none;
  }

  .timer-handle.dragging {
    cursor: grabbing;
  }

  .tick-label {
    font-size: 13px;
    fill: var(--secondary-text-color, #888);
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    pointer-events: none;
  }

  .center-value {
    font-size: 42px;
    fill: var(--primary-text-color);
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    pointer-events: none;
  }

  .center-unit {
    font-size: 13px;
    fill: var(--secondary-text-color, #888);
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    pointer-events: none;
  }

  .bottom-controls {
    display: flex;
    padding: 2px 10px 10px 10px;
    flex-shrink: 0;
  }

  .btn {
    height: 40px;
    border: none;
    border-radius: var(--control-button-border-radius, 10px);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background-color 180ms ease-in-out;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    overflow: hidden;
    position: relative;
  }

  .btn-icon {
    --mdc-icon-size: 20px;
    line-height: 0;
  }

  .power-btn {
    flex: 1;
  }

  .power-btn.on {
    background-color: #F54436;
    color: #ffffff;
  }

  .power-btn.on .btn-icon {
    color: #ffffff;
  }

  .power-btn.on:hover {
    background-color: #d43020;
  }

  .power-btn.off {
    background-color: rgba(158, 158, 158, 0.2);
    color: var(--primary-text-color);
  }

  .power-btn.off .btn-icon {
    color: var(--primary-text-color);
  }

  .power-btn.off:hover {
    background-color: rgba(158, 158, 158, 0.3);
  }
`;
