---
term: Modbus
icon: 'mdi:gate-xnor'
category: Communication
vertical: PLC
description: >-
  Standard industrial communication protocol allowing PLCs to communicate with
  various devices and systems.
details:
  - title: Category
    value: Communication
  - title: Industry
    value: PLC
  - title: Related Terms
    value: 'Ethernet/IP, Profibus, Remote I/O, SCADA, OPC Server'
---
Modbus is a standard industrial communication protocol that was originally developed in 1979 by Modicon (now a brand of Schneider Electric) for use with its programmable logic controllers (PLCs). The protocol is designed to facilitate communication between PLCs and a wide variety of devices and systems. Modbus has become one of the most widely used protocols in the industrial sector due to its simplicity, reliability, and ease of implementation. It is an open protocol, meaning it is publicly available for anyone to implement, and it supports communication over serial lines (RS-232, RS-485) as well as TCP/IP networks.

## Common Applications

### Industrial Automation
Modbus is commonly used in industrial automation systems to connect PLCs with sensors, actuators, and other devices. It enables seamless communication between different types of equipment, facilitating integrated control and monitoring.

### Building Management Systems
In building automation, Modbus is used for controlling HVAC systems, lighting, and other building management functions. It allows for centralized control and monitoring of building systems, enhancing energy efficiency and occupant comfort.

### Energy Management
Modbus is prevalent in energy management applications, where it is used to monitor and control power distribution systems, including smart meters and grid-connected devices. Its ability to handle multiple devices on a single network makes it ideal for these applications.

## Safety Considerations

### Data Integrity
Ensuring data integrity is crucial when using Modbus, especially in safety-critical applications. Implementing error-checking mechanisms, such as CRC (Cyclic Redundancy Check), can help detect errors in data transmission.

### Network Security
Modbus does not inherently include security features, making it vulnerable to unauthorized access and data tampering. Implementing additional security measures, such as firewalls and VPNs, is essential to protect Modbus networks from cyber threats.

## Related Terms or Concepts

### PLC (Programmable Logic Controller)
A digital computer used for automation of industrial processes, such as control of machinery on factory assembly lines. Modbus is often used as a communication protocol for PLCs.

### RS-232/RS-485
Standards for serial communication transmission of data. Modbus can operate over these serial communication lines, enabling data exchange between devices.

### TCP/IP
A set of communication protocols used for the internet and similar networks. Modbus can operate over TCP/IP networks, allowing it to be used in more modern and widespread applications.

### SCADA (Supervisory Control and Data Acquisition)
A system used for controlling and monitoring industrial processes. Modbus can be used for communication within SCADA systems, providing data exchange between the system's components. 

### HMI (Human-Machine Interface)
A user interface or dashboard that connects a person to a machine, system, or device. Modbus is often used to relay information between the HMI and the devices it controls or monitors.
