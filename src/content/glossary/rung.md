---
term: Rung
icon: 'mdi:gate-xnor'
category: Programming
vertical: PLC
description: >-
  Single line of ladder logic programming containing input conditions and output
  instructions, similar to a circuit in relay logic.
details:
  - title: Category
    value: Programming
  - title: Industry
    value: PLC
  - title: Related Terms
    value: 'Ladder Logic, Function Block, Structured Text, Data Table, CPU Module'
---
A "Rung" in the context of Programmable Logic Controllers (PLCs) is a fundamental component of ladder logic programming. It represents a single horizontal line in a ladder diagram, which is a graphical representation of a control process similar to electric circuit diagrams used in relay logic. Each rung consists of input conditions, such as switches, sensors, or other devices, and output instructions, which often include actuators, motors, or other driven components. The main purpose of a rung is to establish logical connections that dictate how inputs affect the outputs, allowing for the control and automation of industrial machinery and processes. By resembling a rung on a ladder, these lines are stacked vertically to form a complete ladder logic program, providing a visual and intuitive way to design complex control systems.

## Common Applications

Rungs are commonly used in various industrial automation processes. They are fundamental in designing control systems for manufacturing equipment, conveyor systems, and packaging machines. Rungs help manage sequential operations, such as starting and stopping motors, controlling solenoids, and handling time-delayed operations. Additionally, they are utilized in the automation of processes like filling, capping, labeling in the food and beverage industry, and are critical in HVAC systems for managing temperature and airflow.

## Safety Considerations

When programming rungs in a PLC, safety is a paramount consideration. Proper design and testing are crucial to ensure that all potential failure modes are addressed. This includes implementing fail-safe designs, ensuring that emergency stops and safety interlocks are properly configured, and regularly testing the logic to prevent unintended operations that might cause injury or damage. Additionally, redundancy can be built into the rungs to ensure that malfunctions in one part of the system do not lead to a complete system failure.

## Related Terms or Concepts

### Ladder Logic

A programming language that represents a program by a graphical diagram based on the circuit diagrams of relay logic hardware. It is widely used in industrial control applications.

### Input and Output Devices

Devices that provide input signals to a PLC, such as switches and sensors, and devices that execute actions based on PLC outputs, like motors or lights.

### Relay Logic

A method of controlling industrial processes using relays and switches, which served as a precursor to modern PLC-based systems.

### Control System

An arrangement of physical and software components that manage, command, direct, or regulate the behavior of other devices or systems, often using PLCs as the central control element.
