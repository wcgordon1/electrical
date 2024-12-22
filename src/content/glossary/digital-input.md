---
term: Digital Input
icon: 'mdi:gate-xnor'
category: Signals
vertical: PLC
description: >-
  Binary (on/off) signal from field devices like limit switches, pushbuttons, or
  proximity sensors.
details:
  - title: Category
    value: Signals
  - title: Industry
    value: PLC
  - title: Related Terms
    value: 'Input Module, Sensor Input, Remote I/O, Data Table, Motor Starter'
---
Digital Input refers to a type of signal used in Programmable Logic Controllers (PLCs) that represents binary states, typically on or off, open or closed, and high or low. These signals are crucial for interfacing PLCs with various field devices, enabling the automation system to receive real-time information about the status of machinery or processes. Digital Inputs are derived from devices such as limit switches, pushbuttons, or proximity sensors. They operate by sending a voltage level or current signal to the PLC, which interprets it as either a logic high (1) or low (0), allowing the PLC to make decisions based on predefined logic.

## Common Applications

### Machine Control
Digital Inputs are widely used in machine control applications to monitor the presence or absence of objects, the position of parts, or the state of machine components. For instance, limit switches can provide feedback about the end position of a moving part, ensuring that the machine operates within safe limits.

### Process Monitoring
In process industries, Digital Inputs are employed to monitor conditions such as pressure limits, fluid levels, or temperature thresholds. These inputs can trigger alarms or corrective actions if the monitored variable goes beyond acceptable ranges.

### Safety Interlocks
Digital Inputs are integral to safety systems where they serve as interlocks. For example, a safety gate switch may provide a digital input to the PLC, ensuring that a machine cannot operate unless the gate is closed, thereby preventing accidents.

## Safety Considerations

### Electrical Isolation
To ensure safety, Digital Inputs often require electrical isolation to protect the PLC and connected devices from voltage spikes or ground loops. Opto-isolators are commonly used to achieve this isolation.

### Debouncing
Digital Inputs from mechanical switches can exhibit noise due to contact bounce. Implementing debouncing, either through hardware or software, is crucial for ensuring that the PLC correctly interprets the input state.

## Related Terms or Concepts

### Analog Input
Unlike Digital Inputs, Analog Inputs provide a continuous range of values. They are used to measure variables such as temperature, pressure, or speed, offering more detailed information than binary states.

### Digital Output
Digital Outputs complement Digital Inputs by allowing the PLC to send binary signals to actuate devices like motors, lights, or relays, effectively controlling the process or machinery.

### Signal Conditioning
This process involves modifying input signals to be suitable for processing by the PLC. Signal conditioning for Digital Inputs may include filtering, isolation, and amplification to ensure accurate and reliable signal interpretation.

### PLC
Programmable Logic Controllers are the central components in industrial automation systems, designed to process input signals, execute control logic, and operate output devices, ensuring efficient and reliable process control.
